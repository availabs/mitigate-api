import json, psycopg2

from shapely.geometry import shape

from config import host

PARCEL_DATA = {}

def handleParcelRow(row, cursor):
	if row[0] is None:
		return

	parcel_id = row[3]

	if parcel_id not in PARCEL_DATA:
		PARCEL_DATA[parcel_id] = {
			"value": 0,
			"buildings": []
		}
	s = shape(json.loads(row[0]))
	data = {
		"area": s.area,
		"id": row[1]
	}
	PARCEL_DATA[parcel_id]["buildings"].append(data)

	if PARCEL_DATA[parcel_id]["value"] == 0:
		sql = '''
			SELECT total_av - land_av
			FROM parcel.parcel_2017_36
			WHERE objectid = %s
		'''
		cursor.execute(sql, [parcel_id])
		value = cursor.fetchone()[0]
		if value is not None:
			PARCEL_DATA[parcel_id]["value"] = int(value)

def handleAssetRow(row, cursor):
	sql = '''
		SELECT replacemen::BIGINT
		FROM public.state_assets_4326
		WHERE id_0 = %s
	'''
	cursor.execute(sql, [row[3]])
	replacement_value = cursor.fetchone()[0]
	if replacement_value != None and int(replacement_value) != 0:
		sql = '''
			EXECUTE stmt(%s, %s)
		'''
		cursor.execute(sql, [row[1], int(replacement_value)])

def loadData(cursor):
	sql = '''
		PREPARE stmt AS
		INSERT INTO irvs.enhanced_building_risk(building_id, replacement_value)
		VALUES ($1, $2)
	'''
	cursor.execute(sql)

	sql = '''
		SELECT ST_AsGeojson(footprint), building_id, data_source, data_source_id
		FROM irvs.buildings
	'''
	cursor.execute(sql)
	for row in [r for r in cursor]:
		if row[2] == "NY Parcel 2017":
			handleParcelRow(row, cursor)
		elif row[2] == "NYS OGS State Assets":
			handleAssetRow(row, cursor)

	for k in PARCEL_DATA:
		value = PARCEL_DATA[k]["value"]
		totalArea = reduce(lambda a, c: a + c["area"], PARCEL_DATA[k]["buildings"], 0)
		for building in PARCEL_DATA[k]["buildings"]:
			buildingValue = int(value * (building["area"] / totalArea))

			if buildingValue != 0:
				sql = '''
					EXECUTE stmt(%s, %s)
				'''
				cursor.execute(sql, [building["id"], buildingValue])

	cursor.execute('DEALLOCATE stmt')

def main():
	connection = psycopg2.connect(host)
	cursor = connection.cursor()

	loadData(cursor)
	connection.commit()

	cursor.close()
	connection.close()
# END main

if __name__ == "__main__":
	main()