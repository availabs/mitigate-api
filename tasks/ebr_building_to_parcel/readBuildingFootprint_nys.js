var dbservice = require('../../db_service');

var fs        = require('fs');

/*
var selectBF = 
"WITH parcel_table AS (
 SELECT p1.objectid,
           tract_geoid,
           cousub_geoid,
           geom
       FROM public."nys_2017_tax_parcels_agencies_4326_WGS_84" AS p1
       INNER JOIN parcel.parcel_2017_36 AS p2
       ON p1.objectid = p2.objectid
   )

SELECT p1.ogc_fid, p1.wkb_geometry, p2.cousub_geoid, p2.geom
FROM public.buildingfootprint_ms AS p1, parcel_table AS p2

INNER JOIN parcel_table ON ST_Contains(geom, wkb_geometry)
WHERE cousub_geoid Like '36001&';


*/

/*
var selectBF = `SELECT 
	p2.county_nam, 
	p1.ST_AsGeoJson(wkb_geometry)
	FROM public.buildingfootprint_ms AS p1
	INNER JOIN public.'nys_2017_tax_parcels_agencies_4326_WGS_84' as p2
	ON ST_Contains(geom, wkb_geometry)
	WHERE p2.county_nam Like 'Albany';`

*/

//Extract only city of albany
/*var selectBF = `SELECT p2.objectid, p2.muni_name, St_asgeojson(p1.wkb_geometry)
	FROM public.buildingfootprint_ms AS p1
	INNER JOIN public."nys_2017_tax_parcels_agencies_4326_WGS_84" as p2 ON ST_Contains(geom, wkb_geometry)
	WHERE p2.muni_name = 'Albany';`*/

var selectBF = `SELECT p2.objectid, p2.muni_name, St_asgeojson(p1.wkb_geometry)
	FROM public.buildingfootprint_ms AS p1
	INNER JOIN public."nys_2017_tax_parcels_agencies_4326_WGS_84" as p2 ON ST_Contains(geom, wkb_geometry);`



/*var selectEBR = "SELECT building_id, geoid, cousub_geoid, ST_AsGeoJson(footprint) FROM irvs.buildings WHERE geoid Like '36061%';"*/   //selecting  just a county m


//var longest_id = 0;

dbservice.promise(selectBF)
.then(function(rows) {
  rows.forEach(row => console.log(`{"type":"Feature", "id": "${row.objectid}", "properties":{"municipality": "${row.muni_name}"}, "geometry":${row.st_asgeojson}}`))
 })




















































































































































































