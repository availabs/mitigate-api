import argparse, csv, os, psycopg2, re

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
			owner_type TEXT,
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

def loadStateAssests(cursor):
	print "LOADING STATE ASSETS..."
	sql = '''
		INSERT INTO irvs.buildings(
			owner_type,
			owner,
			geoid,
			cousub_geoid,
			name,
			data_source,
			data_source_id
		)
		SELECT
			'state',
			'NY State ' || agency,
			geoid,
			cousub_geo,
			location_1,
			'NYS OGS State Assets',
			id_0

		FROM public.state_assets_4326
	'''
	cursor.execute(sql)
	print "STATE ASSETS LOADED."

def loadFootprints(cursor):
	print "LOADING FOOTPRINTS..."
	sql = '''
		SELECT wkb_geometry, ogc_fid, id_0
		FROM state_assets_4326
		INNER JOIN buildingfootprint_ms
		ON ST_Contains(wkb_geometry, st_transform)
	'''
	cursor.execute(sql)
	rows = [row for row in cursor]
	for row in rows:
		sql = '''
			UPDATE irvs.buildings
			SET footprint = %s,
				footprint_source = 'ms_buildings',
				footprint_id = %s
			WHERE data_source_id = %s::TEXT
		'''
		cursor.execute(sql, row)
	print "FOOTPRINTS LOADED."

def loadParcels(cursor):
	print "LOADING PARCEL IDs..."
	print "THIS WILL TAKE AWHILE..."
	sql = '''
		SELECT objectid, id_0
		FROM state_assets_4326
		INNER JOIN public."nys_2017_tax_parcels_agencies_4326_WGS_84"
		ON ST_Contains(geom, st_transform)
	'''
	cursor.execute(sql)
	rows = [row for row in cursor]
	for row in rows:
		sql = '''
			UPDATE irvs.buildings
			SET parcel_id = %s
			WHERE data_source_id = %s::TEXT
		'''
		cursor.execute(sql, row)
	print "PARCEL IDs LOADED."

def main():
	connection = psycopg2.connect(host)
	cursor = connection.cursor()

	createTable(cursor)
	loadStateAssests(cursor)
	loadFootprints(cursor)
	loadParcels(cursor)
	connection.commit()

	cursor.close()
	connection.close()
# END main

if __name__ == "__main__":
	main()