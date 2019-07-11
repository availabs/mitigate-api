var dbservice = require('../../db_service');

var selectBF = `
  BEGIN;

  CREATE TABLE IF NOT EXISTS irvs.tmp_osm_building_albany (
   footprint geometry,footprint_source text, footprint_id  VARCHAR, owner text, type text
    
  );

  TRUNCATE irvs.tmp_osm_building_albany;

  INSERT INTO irvs.tmp_osm_building_albany
    (footprint, footprint_source, footprint_id, owner,type) 
   SELECT 
       p1.wkb_geometry as footrpint,
       'osm building' as footrpint_source,
       p1.osm_id as footprint_id,
       p2.add_owner as owner, 
       p1.type as type

	FROM public.nys_osm_buildings AS p1

	INNER JOIN public."nys_2017_tax_parcels_agencies_4326_WGS_84" as p2
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
	WHERE p2.muni_name = 'Albany'
	;

   COMMIT;
`

	dbservice.promise(selectBF).then(d=> {
		console.log('inserted', d)
	})