
var dbservice = require('../../db_service');


var selectOGS = `

  
Update irvs.enhanced_building_risk_1  as p1
 set critical = p2.FCode

 FROM public.STRUCT_New_York_State_GDB Struct_Point as p2, 
             irvs.buildings_2018_new as p3

 WHERE ST_Contains( p3.footprint, p2.geom );


Update irvs.irvs.buildings_2018_new  as p1
 set name = p2.Name

 FROM public.STRUCT_New_York_State_GDB Struct_Point as p2
         
 WHERE ST_Contains( p1.footprint, p2.geom )
 and p1.name is null;


`
	dbservice.promise(selectOGS).then(d=> {
		console.log('inserted', d)
	})

