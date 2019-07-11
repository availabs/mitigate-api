const { getGeoidLengths } = require("./utils");

const ATTRIBUTES = [
		"footprint", 
		"footprint_source",
		"footprint_id",
		"owner",
		"owner_type", 
		"type",
		"name",
		"parcel_id",
		"geoid",
		"cousub_geoid",
		"id",
		"ogs_id",
		"replacement_value",
		"critical",
		"flood_zone"
		

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
            	: `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
        		count(1) AS length
        	FROM irvs.buildings_2018
        	WHERE
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(geoid, 1, ${ geoLen })`
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
            	: `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
            ARRAY_AGG(id) AS ids
          FROM irvs.buildings_2018
          WHERE
        		${ geoLen === 10 ?
            	`cousub_geoid`
            	: `substring(geoid, 1, ${ geoLen })`
            } IN ('${ filteredGeoids.join(`','`) }')
           GROUP BY 1
				`
			 //console.log("SQL:",sql)
			return db_service.promise(sql);
		})
		return Promise.all(queries)
			.then(data => [].concat(...data));
	},

	byId: (db_service, buildingids, cols) => {
		var result = cols.map(col => 'a.'+col)
		const sql = `
			SELECT id AS id,
				${ cols.join() }
			FROM irvs.buildings_2018 as a
			join irvs.enhanced_building_risk as b on a.id = b.building_id 
			WHERE id IN (${ buildingids });
		`;
		return db_service.promise(sql);
	}
}

/*
yId: (db_service, buildingids, cols) => {
		console.log('cols',cols)
		const sql = `
			SELECT a.id AS id,
				${ cols.join() }
			FROM irvs.buildings_2018 as a
			join irvs.enhanced_building_risk as b on a.id = b.building_id
			WHERE id IN (${ buildingids });
		`
		// console.log('SQL:',sql)

		return db_service.promise(sql);
	}
 */