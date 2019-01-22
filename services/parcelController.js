const { getGeoidLengths } = require("./utils");

const ATTRIBUTES = [
	"prop_class",
	"roll_secti",
	"land_av",
	"total_av",
	"full_marke",
	"yr_blt",
	"front",
	"depth",
	"sq_ft",
	"acres",
	"school_cod",
	"school_nam",
	"sewer_type",
	"sewer_desc",
	"water_supp",
	"water_desc",
	"utilities",
	"utilities_",
	"bldg_style",
	"bldg_sty_1",
	"heat_type",
	"heat_type_",
	"fuel_type",
	"fuel_type_",
	"sqft_livin",
	"nbr_kitche",
	"nbr_full_b",
	"nbr_bedroo",
	"used_as_co",
	"used_as_de",
	"ag_dist_co",
	"ag_dist_na",
	"primary_ow",
	"owner_type"
]

module.exports = {
	ATTRIBUTES,

	length: (db_service, geoids) => {
    const queries = getGeoidLengths(geoids).map(geoLen => {
    	const filteredGeoids = geoids.filter(d => d.length === geoLen),
    		sql = `
        	SELECT
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(tract_geoid, 1, ${ geoLen })`
            } AS geoid,
        		count(1) AS length
        	FROM parcel.parcel_2017_36
        	WHERE
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(tract_geoid, 1, ${ geoLen })`
            } IN ('${ filteredGeoids.join(`','`) }')
	        GROUP BY 1
      	`;
// console.log("SQL:",sql);
    	return db_service.promise(sql);
    })
    return Promise.all(queries)
    	.then(data => {
    		return [].concat(...data)
    	});
	},

	byIndex: (db_service, geoids) => {
    const queries = getGeoidLengths(geoids).map(geoLen => {
    	const filteredGeoids = geoids.filter(d => d.length === geoLen),
    		sql = `
        	SELECT
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(tract_geoid, 1, ${ geoLen })`
            } AS geoid,
            objectid AS id
        	FROM parcel.parcel_2017_36
        	WHERE
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(tract_geoid, 1, ${ geoLen })`
            } IN ('${ filteredGeoids.join(`','`) }')
      	`;
// console.log("SQL:",sql);
    	return db_service.promise(sql);
    })
    return Promise.all(queries)
    	.then(data => {
    		return [].concat(...data)
    	});
	},

	byId: (db_service, parcelids) => {
		const sql = `
			SELECT objectid AS id,
				${ ATTRIBUTES }
			FROM parcel.parcel_2017_36
			WHERE objectid IN (${ parcelids });
		`
		//console.log('SQL:',sql)

		return db_service.promise(sql);
	}
}