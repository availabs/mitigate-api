import psycopg2

from config import host

def loadData(cursor):
	sql = '''
		PREPARE stmt AS
		UPDATE irvs.enhanced_building_risk
		SET floodplain = $1
		WHERE building_id = $2
	'''
	cursor.execute(sql)

	sql = '''
		SELECT string_agg("FLD_ZONE", '|'), building_id
		FROM irvs.buildings
		INNER JOIN "flood_DFIRM"."nys_flood_DFIRM"
		ON ST_Intersects(ST_Transform(geom, 4326), footprint)
		WHERE footprint IS NOT NULL
		GROUP BY building_id
	'''
	cursor.execute(sql)
	for row in [r for r in cursor]:
		cursor.execute("EXECUTE stmt(%s, %s)", row)

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