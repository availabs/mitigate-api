var dbservice = require('../../db_service');

var selectBF = `
  BEGIN;

  CREATE TABLE IF NOT EXISTS irvs.tmp_osm_buildings_new(
   footprint geometry,footprint_source VARCHAR, footprint_id  VARCHAR, owner VARCHAR, owner_type VARCHAR, type VARCHAR, 
   name VARCHAR, parcel_id VARCHAR, geoid VARCHAR, cousub_geoid VARCHAR);

   TRUNCATE irvs.tmp_osm_buildings_new;
   
  INSERT INTO irvs.tmp_osm_buildings_new
    (footprint, footprint_source, footprint_id, owner,owner_type, type, name, parcel_id) 
   SELECT 
       p1.wkb_geometry as footrpint,
       'osm building' as footrpint_source,
       p1.osm_id as footprint_id,
       p2.primary_owner as owner, 
       p2.owner_type as owner_type,
       p1.type as type,
       p1.name as name,
       p2.ogc_fid as parcel_id
      
	FROM public.nys_osm_buildings AS p1

	INNER JOIN public."nys_2017_tax_parcels_1811_valid_1" as p2
	ON (
	    (ST_Contains(p2.wkb_geometry, p1.wkb_geometry))
	    OR 
		( 
		  st_intersects(
			p2.wkb_geometry,
			p1.wkb_geometry
		  )
		  and
		  (
		    (
			    st_area(
			      st_intersection(
			        p2.wkb_geometry,
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
	
	;

   COMMIT;
`

	dbservice.promise(selectBF).then(d=> {
		console.log('inserted', d)
	})