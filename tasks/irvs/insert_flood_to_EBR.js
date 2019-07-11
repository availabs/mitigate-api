var dbservice = require('../../db_service');


var updateEBR = `

Update irvs.enhanced_building_risk_1 as p1

set flood_depth = p3.depth::integer,
	flood_velocity=p3.velocity::integer,
	flood_base_elevation=p3.static_bfe::integer,
	flood_zone = p3.fld_zone


FROM irvs.buildings_2018_new as p2,
  public."nys_100yr_DFIRMs" as p3
     

WHERE ST_intersects(st_transform(p3.geom, 4326), p2.footprint )
		And p1.building_id = p2.id::bigint 

		/*
		AND p2.cousub_geoid = '3600101000'*/

	



/*SELECT building_id, replacement_value, critical, landmark, p3.fld_zone as flood_zone, p3.zone_subty as zone_subty, p3.depth as flood_depth, p3.velocity as flood_velocity, p3.static_bfe as flood_base_elevation, value_source
       
into irvs.enhanced_building_risk_intersects_

FROM irvs.enhanced_building_risk as p1 

join  irvs.buildings_2018_new as p2 
   on p1.building_id = p2.id::bigint 
   
--join "flood_DFIRM"."nys_flood_DFIRM_4326" as p3
join public."nys_500yr_DFIRMs" as p3
   on ST_intersects(st_transform(p3.geom, 4326), p2.footprint )

--where p2.cousub_geoid = '3600101000'
*/

`
	dbservice.promise(updateEBR).then(d=> {
		console.log('inserted', d)
		dbservice.end();
	})

