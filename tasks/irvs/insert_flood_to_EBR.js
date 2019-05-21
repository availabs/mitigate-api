var dbservice = require('../../db_service');


var updateEBR = `

/*Update irvs.enhanced_building_risk_1 as p1

set flood_zone = p3."FLD_ZONE",
	flood_depth = p3."DEPTH"::integer,
	flood_velocity=p3."VELOCITY"::integer,
	flood_base_elevation=p3."STATIC_BFE"::integer 


FROM irvs.buildings_2018_new as p2,
   "flood_DFIRM"."nys_flood_DFIRM_4326" as p3
     

WHERE ST_Contains( p2.footprint, p3.geom )
		And p1.building_id = p2.id::bigint 
		/*And p1.footprint IS NOT NULL*/
		AND p2.cousub_geoid = '3600101000'

		;*/


SELECT building_id, replacement_value, critical, landmark, p3."FLD_ZONE" as flood_zone, p3."DEPTH" as flood_depth, p3."VELOCITY" as flood_velocity, p3."STATIC_BFE" as flood_base_elevation, value_source
       
into irvs.enhanced_building_risk_albany_test

FROM irvs.enhanced_building_risk as p1 

join  irvs.buildings_2018_new as p2 
   on p1.building_id = p2.id::bigint 

join "flood_DFIRM"."nys_flood_DFIRM_4326" as p3
   on ST_Contains( p3.geom, p2.footprint )
    

where p2.cousub_geoid = '3600101000';


`
	dbservice.promise(updateEBR).then(d=> {
		console.log('inserted', d)
		dbservice.end();
	})

