import psycopg2
import database_config

def createTable(cursor):
    print "CREATING TABLE..."
    sql = '''
		DROP TABLE IF EXISTS parcel.parcel_meta;
		CREATE TABLE parcel.parcel_meta(
		    field VARCHAR,
			value VARCHAR,
			name VARCHAR
		)
	'''
    cursor.execute(sql)
    print "TABLE CREATED."


def main():
    print('Connecting to the PostgreSQL database...')
    connection = psycopg2.connect(host=database_config.DATABASE_CONFIG['host'], database=database_config.DATABASE_CONFIG['dbname'], user=database_config.DATABASE_CONFIG['user'], password=database_config.DATABASE_CONFIG['password'])
    cursor = connection.cursor()

    createTable(cursor)
    connection.commit()

    cursor.close()
    connection.close()
# END main

if __name__ == "__main__":
    main()