var dbservice = require('../../db_service');

var selectBF = `
  BEGIN;

  CREATE TABLE IF NOT EXISTS irvs.tmp_ms_building_bronx(
   footprint geometry,footprint_source VARCHAR, footprint_id  VARCHAR, owner VARCHAR, owner_type VARCHAR, type VARCHAR, 
   name VARCHAR, parcel_id VARCHAR, geoid VARCHAR, cousub_geoid VARCHAR);

  TRUNCATE irvs.tmp_ms_building_bronx;

  INSERT INTO irvs.tmp_ms_building_bronx
    (footprint, footprint_source, footprint_id, owner,owner_type, /*type, name,*/ parcel_id) 
   SELECT 
       p1.wkb_geometry as footrpint,
       'ms building footprints' as footrpint_source,
       p1.ogc_fid as footprint_id,
       p2.primary_ow as owner, 
       p2.owner_type as owner_type,
    /*   p1.type as type,*/
  /*     p1.name as name,*/
       p2.objectid as parcel_id
      
	FROM public.buildingfootprint_ms_valid AS p1

	INNER JOIN public."nys_leftover_parcels_for_msfootprint" as p2
	ON (
	    (ST_Contains(p2.geom, p1.wkb_geometry))
	    OR 
		( 
		  st_intersects(
			p2.geom,
			p1.wkb_geometry
		  )
		  and
		  (
		    (
			    st_area(
			      st_intersection(
			        p2.geom,
			        p1.wkb_geometry
			      )
			    )
			    /
			    st_area(p1.wkb_geometry)
			)
		    > 
		    0.5
		  )
		)
       )
	WHERE p2.county_nam = 'Bronx'
	;

   COMMIT;
`

	dbservice.promise(selectBF).then(d=> {
		console.log('inserted', d)
	})