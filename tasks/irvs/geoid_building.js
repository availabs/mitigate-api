var dbservice = require('../../db_service');


var selectgeoid = `

SELECT footprint, footprint_source, footprint_id, owner, owner_type, 
       type, a.name, parcel_id, c.geoid as geoid, b.geoid as cousub_geoid, a.id, ogs_id, replace_val

into irvs.buildings_2018_new
    FROM irvs.buildings_2018_new as a
  join geo.tl_2017_36_cousub_4326 as b on ST_CONTAINS(b.geom, a.footprint)
   join geo.tl_2017_36_tract_4326 as c on ST_CONTAINS(c.geom, a.footprint)
 ;

`
  dbservice.promise(selectgeoid).then(d=> {
    console.log('inserted', d)
  })

