const { getGeoidLengths } = require("./utils");

const ATTRIBUTES = [
	'id',
	'location',
	'desc',
	'geoid',
	'cousub',
	'agency',
	'status'
]
const toString = d => d && d.toString();
const toNum = d => d && +d;
const toJson = d => d && JSON.parse(d);
const COERCE = {
	id: toNum,
	location: toString,
	desc: toString,
	geoid: toString,
	cousub: toString,
	agency: toString,
	status: toString
}

module.exports = {
	ATTRIBUTES,
	COERCE,

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
		        	FROM public.ogs
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
	      	.then(data => [].concat(...data));
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
			            id
		        	FROM public.ogs
		        	WHERE
		        		${ geoLen === 10 ?
			              	`cousub_geoid`
			              	: `substring(geoid, 1, ${ geoLen })`
			            } IN ('${ filteredGeoids.join(`','`) }')
		      	`;
// console.log("SQL:",sql);
	      	return db_service.promise(sql);
	    })
	    return Promise.all(queries)
	      	.then(data => [].concat(...data));
	},

	byId: (db_service, ids) => {
		const sql = `
			SELECT
				id,
				ST_AsGeoJSON(ST_MakePoint(COALESCE(building_longitude, site_longitude), COALESCE(building_latitude, site_latitude))) AS location,
				CONCAT(financial_asset_description, ', ' || profile_description, ', ' || site_description) AS desc,
				city_town AS city,
				geoid,
				cousub_geoid AS cousub,
				agency,
				status
				FROM public.ogs
				WHERE id IN (${ ids })
		`;
// console.log("SQL:",sql);
		return db_service.promise(sql);
	}
}