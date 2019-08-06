import psycopg2
import database_config

def createTable(cursor):
    print "DELETING ALL ROWS IN  TABLE..."
    sql = '''
		DELETE FROM parcel.parcel_meta
	'''
    cursor.execute(sql)
    print "ALL ROWS DELETED"


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