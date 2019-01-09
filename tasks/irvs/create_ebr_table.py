import psycopg2

from config import host

def createTable(cursor):
	print "CREATING TABLE..."
	sql = '''
		DROP TABLE IF EXISTS irvs.enhanced_building_risk;
		CREATE TABLE irvs.enhanced_building_risk(
			building_id BIGINT PRIMARY KEY,
			replacement_value BIGINT,
			floodplain TEXT,
			critical TEXT
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