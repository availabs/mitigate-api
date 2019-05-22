var dbservice = require('../../db_service');


var selectgeoid = `

SELECT footprint, footprint_source, footprint_id, owner, owner_type, 
       type, a.name, parcel_id, c.geoid as geoid, b.geoid as cousub_geoid, a.id, ogs_id, replace_val, b.fld_zone as fld_zone, b.zone_subty as fld_zone

into irvs.buildings_2018__new_test
    FROM irvs.buildings_2018_old as a
  join public.nys_100yr_DFIRMs as b on ST_CONTAINS(b.geom, a.footprint)
      OR( 
          st_intersects( b.geom,a.footprint)
          and ( (st_area(st_intersection( b.geom,a.footprint)) / st_area(a.footprint) ) >  0.5 )
        )

   join public.nys_500yr_DFIRMs as c on ST_CONTAINS(c.geom, a.footprint)
      OR(  
          st_intersects( c.geom, a.footprint)
          and ( (st_area(st_intersection( c.geom, a.footprint))/ st_area(a.footprint) ) >  0.5 )
        )
      WHERE b.countyfp = '001'
   ;


`
  dbservice.promise(selectgeoid).then(d=> {
    console.log('inserted', d)
  })

