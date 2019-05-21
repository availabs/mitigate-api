import psycopg2

from config import host

def loadData(cursor):
	sql = '''
		PREPARE stmt AS
		UPDATE irvs.enhanced_building_risk_1
		SET 
			flood_zone = $1,
			flood_depth = $2,
			flood_velocity=$3,
			flood_base_elevation=$4
		WHERE building_id = $5
	'''
	cursor.execute(sql)

	sql = '''
		SELECT array_agg("FLD_ZONE") as flood_zone, max("DEPTH") as flood_depth, max("VELOCITY") as flood_velocity, max("STATIC_BFE") as base_flood_elevation, building_id
		FROM irvs.buildings_new
		INNER JOIN "flood_DFIRM"."nys_flood_DFIRM_4326"
		ON ST_Intersects(geom, footprint)
		WHERE footprint IS NOT NULL
		AND cousub_geoid = '3600101000'
		AND building_id IN (
			SELECT building_id
			FROM irvs.enhanced_building_risk_1
		)
		GROUP BY building_id 
	'''
	cursor.execute(sql)
	for row in [r for r in cursor]:
		cursor.execute("EXECUTE stmt(%s, %s, %s, %s, %s)", row)

	cursor.execute("DEALLOCATE stmt")

def main():
	connection = psycopg2.connect(host)
	cursor = connection.cursor()

	loadData(cursor)
	connection.commit()

	cursor.close()
	connection.close()
# END main

if __name__ == "__main__":
	main()