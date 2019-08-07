import psycopg2
import database_config

def createTable(cursor):
    print "UPDATING TABLE..."
    sql = '''
		UPDATE irvs.enhanced_building_risk SET heat_type = b.heat_type
        FROM irvs.enhanced_building_risk as a
        JOIN parcel.parcel_2017_36 as b on a.building_id = b.objectid
	'''
    cursor.execute(sql)
    print "TABLE UPDATED."


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