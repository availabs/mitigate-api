var dbservice = require('../../db_service');

var fs        = require('fs');

/*
   * Pass the ReadStream object to xml-stream
*/

var selectEBR = "SELECT building_id, cousub_geoid, ST_AsGeoJson(footprint) FROM irvs.buildings;"

/*var selectEBR = "SELECT building_id, geoid, cousub_geoid, ST_AsGeoJson(footprint) FROM irvs.buildings WHERE geoid Like '36061%';"*/   //selecting  just a county


//var longest_id = 0;

dbservice.promise(selectEBR)
.then(function(rows) {
  rows.forEach(row => console.log(`{"type":"Feature", "id": "${row.building_id}", "properties":{"cousub_geoid": "${row.cousub_geoid}"}, "geometry":${row.st_asgeojson}}`))
 })
