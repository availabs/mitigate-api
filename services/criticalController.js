const { getGeoidLengths } = require("./utils");

const ATTRIBUTES = [
	'location',
	'desc',
	'source',
	'name',
	'address',
	'geoid',
	'cousub',
	'ftype',
	'fcode'
]
const toString = d => d && d.toString();
const toNum = d => d && +d;
const toJson = d => d && JSON.parse(d);
const COERCE = {
	location: toString,
	desc: toString,
	source: toString,
	name: toString,
	address: toString,
	geoid: toString,
	cousub: toString,
	ftype: toString,
	fcode: toString
}

module.exports = {
	ATTRIBUTES,
	COERCE,

	critLength: (db_service, geoids) => {
	    const queries = getGeoidLengths(geoids).map(geoLen => {
	      	const filteredGeoids = geoids.filter(d => d.length === geoLen),
	      		sql = `
		        	SELECT
		        		${ geoLen === 10 ?
			              	`cousub_geoid`
			              	: `substring(geoid, 1, ${ geoLen })`
			            } AS geoid,
		          		count(1) AS length
		        	FROM public."STRUCT_New_York_State_GDB Struct_Point"
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

	critIndices: (db_service, geoids) => {
	    const queries = getGeoidLengths(geoids).map(geoLen => {
	      	const filteredGeoids = geoids.filter(d => d.length === geoLen),
	      		sql = `
		        	SELECT
		        		${ geoLen === 10 ?
			              	`cousub_geoid`
			              	: `substring(geoid, 1, ${ geoLen })`
			            } AS geoid,
			            id
		        	FROM public."STRUCT_New_York_State_GDB Struct_Point"
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

	critById: (db_service, ids) => {
		const sql = `
			SELECT
				id,
				ST_AsGeoJSON(geom) AS location,
				"Source_DataDesc" AS desc,
				"Source_Originator" AS source,
				"Name" AS name,
				"Address" AS address,
				"City" AS city,
				"State" AS state,
				"Zipcode" AS zip,
				geoid,
				"FType" AS ftype,
				"FCode" AS fcode,
				cousub_geoid AS cousub
				FROM public."STRUCT_New_York_State_GDB Struct_Point"
				WHERE id IN (${ ids })
		`;
// console.log("SQL:",sql);
		return db_service.promise(sql);
	}
}