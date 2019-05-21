Update irvs.enhanced_building_risk_1 as p1

set flood_depth = p3.depth::integer,
	flood_velocity=p3.velocity::integer,
	flood_base_elevation=p3.static_bfe::integer,
	flood_zone = p3.fld_zone


FROM irvs.buildings_2018_new as p2,
  public."nys_100yr_DFIRMs" as p3
     

WHERE ST_intersects(st_transform(p3.geom, 4326), p2.footprint )
		And p1.building_id = p2.id::bigint 
		--AND p2.cousub_geoid = '3600101000';