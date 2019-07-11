const { getGeoidLengths } = require("./utils");

const ATTRIBUTES = [
	"prop_class",
	"roll_section",
	"land_av",
	"total_av",
	"full_market_val",
	"yr_blt",
	"front",
	"depth",
	"sq_ft",
	"acres",
	"school_code",
	"school_name",
	"sewer_type",
	"sewer_desc",
	"water_supply",
	"water_desc",
	"utilities",
	"utilities_desc",
	"bldg_style",
	"bldg_style_desc",
	"heat_type",
	"heat_type_desc",
	"fuel_type",
	"fuel_type_desc",
	"sqft_living",
	"nbr_kitchens",
	"nbr_full_baths",
	"nbr_bedrooms",
	"used_as_code",
	"used_as_desc",
	"ag_dist_code",
	"ag_dist_name",
	"primary_owner",
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
            ARRAY_AGG(objectid) AS ids
          FROM parcel.parcel_2017_36
          WHERE
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(tract_geoid, 1, ${ geoLen })`
            } IN ('${ filteredGeoids.join(`','`) }')
           GROUP BY 1
				`
			 //console.log("SQL:",sql)
			return db_service.promise(sql);
		})
		return Promise.all(queries)
			.then(data => [].concat(...data));
	},

	byId: (db_service, parcelids, cols) => {
		const sql = `
			SELECT objectid AS id,
				${ cols.join() }
			FROM parcel.parcel_2017_36
			WHERE objectid IN (${ parcelids });
		`
		// console.log('SQL:',sql)

		return db_service.promise(sql);
	}
}