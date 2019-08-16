import psycopg2
import database_config
import pandas
import csv

def createTable(cursor):
    print "UPDATING  DATA..."
    with open('new_output.csv', 'r') as f:
            cursor.copy_from(f, 'irvs.tmp_x', sep= ',')
    print('Data Updated')
    sql = '''
		UPDATE irvs.enhanced_building_risk
        SET    num_residents = tmp_x.num_residents
        FROM   irvs.tmp_x
        WHERE  irvs.enhanced_building_risk.building_id = tmp_x.building_id;
	'''
    cursor.execute(sql)
    print "TABLE UPDATED"

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