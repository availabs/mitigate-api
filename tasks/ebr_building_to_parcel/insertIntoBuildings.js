var dbservice = require('../../db_service');


var selectOGS = `

  UPDATE irvs.buildings_2018_1 as p1

  SET name = p2.financial1,
      ogs_id = p2.id 

  FROM public.state_assets_4326 as p2

  WHERE ST_Contains(p1.footprint, p2.st_transform);


`
	dbservice.promise(selectOGS).then(d=> {
		console.log('inserted', d)
	})

 