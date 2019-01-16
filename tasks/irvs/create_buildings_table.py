import psycopg2

from config import host

def createTable(cursor):
	print "CREATING TABLE..."
	sql = '''
		DROP TABLE IF EXISTS irvs.buildings;
		CREATE TABLE irvs.buildings(
			building_id BIGSERIAL PRIMARY KEY,
			footprint GEOMETRY,
			footprint_source TEXT,
			footprint_id TEXT,
			owner TEXT,
			geoid TEXT,
			cousub_geoid TEXT,
			name TEXT,
			data_source TEXT,
			data_source_id TEXT,
			parcel_id TEXT
		)
	'''
	cursor.execute(sql)
	print "TABLE CREATED."
# END createTable

def main():
	connection = psycopg2.connect(host)
	cursor = connection.cursor()

	createTable(cursor)
	connection.commit()

	cursor.close()
	connection.close()
# END main

if __name__ == "__main__":
	main()