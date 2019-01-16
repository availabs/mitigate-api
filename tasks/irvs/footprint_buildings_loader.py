import psycopg2

from config import host

def loadFootprints(cursor):
	sql = '''
	WITH parcel_table AS (
		SELECT p1.objectid,
			tract_geoid,
			cousub_geoid,
			geom
		FROM public."nys_2017_tax_parcels_agencies_4326_WGS_84" AS p1
		INNER JOIN parcel.parcel_2017_36 AS p2
		ON p1.objectid = p2.objectid
	)
	INSERT INTO irvs.buildings(
		footprint,
		footprint_source,
		footprint_id,
		geoid,
		cousub_geoid,
		data_source,
		data_source_id,
		parcel_id
	)
	SELECT wkb_geometry,
		'ms_buildings',
		ogc_fid,
		tract_geoid,
		cousub_geoid,
		'NY Parcel 2017',
		objectid,
		objectid
	FROM public.buildingfootprint_ms
	INNER JOIN parcel_table
	ON ST_Contains(geom, wkb_geometry)
	WHERE ogc_fid::TEXT NOT IN (
		SELECT footprint_id
		FROM irvs.buildings
		WHERE footprint_source = 'ms_buildings'
	)
	'''
	cursor.execute(sql)

def main():
	connection = psycopg2.connect(host)
	cursor = connection.cursor()

	loadFootprints(cursor)
	connection.commit()

	cursor.close()
	connection.close()
# END main

if __name__ == "__main__":
	main()