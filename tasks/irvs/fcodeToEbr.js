var dbservice = require('../../db_service');


var updateEBR = `

UPDATE irvs.enhanced_building_risk_1 as a
 SET critical = p1.fcode
  FROM public.nys_structure_points AS p1
 INNER JOIN irvs.buildings_2018_new AS p2
  on ST_Contains(p2.footprint, p1.geom)
  where a.building_id = p2.id

`
	dbservice.promise(updateEBR).then(d=> {
		console.log('inserted', d)
	})

