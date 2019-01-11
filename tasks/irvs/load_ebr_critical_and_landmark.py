import psycopg2

from config import host

def loadData(cursor):
	sql = '''
		PREPARE stmt AS
		UPDATE irvs.enhanced_building_risk
		SET critical = $1,
			landmark = $2
		WHERE building_id = $3
	'''
	cursor.execute(sql)

	sql = '''
		SELECT "FCode", "IsLandmark", building_id
		FROM irvs.buildings
		INNER JOIN public."STRUCT_New_York_State_GDB Struct_Point"
		ON ST_Contains(footprint, ST_Transform(geom, 4326))
		WHERE footprint IS NOT NULL
		AND geom IS NOT NULL
		AND building_id IN (
			SELECT building_id
			FROM irvs.enhanced_building_risk
		)
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