var dbservice = require('../../db_service');


var selectOGS = `

Update irvs.buildings_2018_3 as p1

set name = p2.financial1,
    ogs_id = p2.id

FROM public.state_assets_4326 as p2, 
     public.nys_2017_tax_parcels_1811_valid_1 as p3

WHERE ST_Contains( p3.wkb_geometry, p2.st_transform )

And p1.parcel_id = p3.objectid::character varying;

`
	dbservice.promise(selectOGS).then(d=> {
		console.log('inserted', d)
		dbservice.end();
	})

