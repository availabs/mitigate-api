var dbservice = require('../../db_service');


var updateEBR = `

update irvs.enhanced_building_risk_1
 set value_source = 'ogs_test'
 WHERE value_source ='ogs';

`
	dbservice.promise(updateEBR).then(d=> {
		console.log('inserted', d)
	})

