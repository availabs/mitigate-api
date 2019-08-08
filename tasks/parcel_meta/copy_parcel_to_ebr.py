import psycopg2
import database_config

def createTable(cursor):
    print "UPDATING TABLE..."
    sql = '''
		UPDATE irvs.enhanced_building_risk as b SET
        address = CONCAT_WS('',a.parcel_addr,a.muni_name,a.loc_zip),
        heat_type = a.heat_type,
        bldg_style = a.bldg_style,
        sqft_living = a.sqft_living,
        nbr_kitchens = a.nbr_kitchens,
        nbr_full_baths = a.nbr_full_baths,
        nbr_bedrooms = a.nbr_bedrooms,
        fuel_type = a.fuel_type,
        water_supply = a.water_supply,
        sewer_type = a.sewer_type,
        geoid = a.geoid,
        cousub_geoid = a.cousub_geoid,
        tract_geoid = a.tract_geoid,
        dup_geoid = a.dup_geo
        FROM parcel.parcel_2017_36 as a
        WHERE a.objectid = b.building_id
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