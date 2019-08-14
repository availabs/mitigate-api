import psycopg2
import database_config
import pandas
import csv

def createTable(cursor):
    print "FETCHING DATA..."
    sql = '''
		SELECT CAST(a.geoid AS bigint),a.building_id,
        a.prop_class,a.nbr_bedrooms,a.num_residents,b.value as population
        FROM irvs.enhanced_building_risk as a
        JOIN census_data.censusData as b on CAST(a.geoid as bigint) = b.geoid
        WHERE b.year = '2017' AND b.censvar = 'B01003_001E'
        AND length(CAST(b.geoid as VARCHAR)) =12
        AND a.geoid IN ('360010004011','360010002001','360010002002')
        group by a.building_id,b.value
        order by a.building_id
	'''
    cursor.execute(sql)
    connection = psycopg2.connect(host=database_config.DATABASE_CONFIG['host'], database=database_config.DATABASE_CONFIG['dbname'], user=database_config.DATABASE_CONFIG['user'], password=database_config.DATABASE_CONFIG['password'])
    results = pandas.read_sql_query(sql, connection)
    results.to_csv("output_population.csv", index=False)
    print "TABLE FETCHED AND CSV CREATED"

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

'''
sum of nbr_bedrooms is greater than the population itself
- 360010002002
- 360010001001
'''