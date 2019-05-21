/*Update irvs.enhanced_building_risk_1 as p1

set flood_depth = p3.depth::integer,
	flood_velocity=p3.velocity::integer,
	flood_base_elevation=p3.static_bfe::integer,
	flood_zone = p3.fld_zone


FROM irvs.buildings_2018_new as p2,
  public."nys_100yr_DFIRMs" as p3
     

WHERE ST_intersects(st_transform(p3.geom, 4326), p2.footprint )
		And p1.building_id = p2.id::bigint 
		--AND p2.cousub_geoid = '3600101000';
*/



SELECT building_id, replacement_value, critical, p3.islandmark::integer as landmark, flood_depth, 
       flood_velocity, flood_base_elevation, value_source, flood_zone
       
into irvs.enhanced_building_risk_albany_landmark

FROM irvs.enhanced_building_risk as p1 

join  irvs.buildings_2018_new as p2 
   on p1.building_id = p2.id::bigint 

join nys_structure_points as p3
   on ST_Contains(  p2.footprint, p3.geom )
    

where p2.cousub_geoid = '3600101000';
