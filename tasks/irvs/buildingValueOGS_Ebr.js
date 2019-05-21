var dbservice = require('../../db_service');


var updateEBR = `

insert into irvs.enhanced_building_risk  (building_id, replace_val_ogs)
	select  p2.id as building_id,
            p2.replace_val as replace_val_ogs	 
	 FROM irvs.buildings_2018_new as p2  	 
	  where p2.replace_val is not null;



`
	dbservice.promise(updateEBR).then(d=> {
		console.log('inserted', d)
	})

