const { getGeoidLengths } = require("./utils"),

	ATTRIBUTES = [
		"replacement_value",
		"flood_zone",
		"parcel_id",
		"critical"
	];

module.exports = {
	ATTRIBUTES,

	getMeta: (db_service, options) => {
		const sql = `
			SELECT names.column_id AS option,
				name,
				ARRAY_AGG(value) AS values
			FROM irvs.irvs_names AS names
			INNER JOIN irvs.irvs_values AS values
			ON names.column_id = values.column_id
			WHERE names.column_id IN ('${ options.join(`', '`) }')
			GROUP BY names.column_id, names.name
		`
// console.log("SQL:",sql)
		return db_service.promise(sql);
	},

	byParcelLength: (db_service, parcelids) => {
		const sql = `
			SELECT parcel_id AS parcelid,
				count(1) AS length
			FROM irvs.buildings
			WHERE parcel_id IN ('${ parcelids.join("','") }')
			GROUP BY parcel_id
		`
		return db_service.promise(sql);
	},
	byParcelByIndex: (db_service, parcelids) => {
		const sql = `
			SELECT parcel_id AS parcelid,
				building_id AS buildingid
			FROM irvs.buildings
			WHERE parcel_id IN ('${ parcelids.join("','") }')
		`
		return db_service.promise(sql);
	},

	byGeoidLength: (db_service, geoids) => {
		const queries = getGeoidLengths(geoids).map(geoLen => {
			const filteredGeoids = geoids.filter(g => g.length === geoLen),
				sql = `
					SELECT ${
							geoLen === 10 ?
							`cousub_geoid` :
							`substring(geoid, 1, ${ geoLen })`
						} AS geoid,
						count(1) AS length
					FROM irvs.buildings
					WHERE ${
						geoLen === 10 ?
						`cousub_geoid` :
						`substring(geoid, 1, ${ geoLen })`
					} IN ('${ filteredGeoids.join(`','`) }')
					GROUP BY 1;
				`
// console.log("SQL:",sql);
				return db_service.promise(sql)
		})
		return Promise.all(queries)
			.then(data => [].concat(...data))
	},
	byGeoidByIndex: (db_service, geoids) => {
		const queries = getGeoidLengths(geoids).map(geoLen => {
			const filteredGeoids = geoids.filter(g => g.length === geoLen),
				sql = `
					SELECT ${
							geoLen === 10 ?
							`cousub_geoid` :
							`substring(geoid, 1, ${ geoLen })`
						} AS geoid,
						building_id AS buildingid
					FROM irvs.buildings
					WHERE ${
						geoLen === 10 ?
						`cousub_geoid` :
						`substring(geoid, 1, ${ geoLen })`
					} IN ('${ filteredGeoids.join(`','`) }');
				`
				return db_service.promise(sql)
		})
		return Promise.all(queries)
			.then(data => [].concat(...data))
	},

	byId: (db_service, buildingids) => {
		const sql = `
			SELECT bldngs.building_id AS buildingid,
				${ ATTRIBUTES }
			FROM irvs.buildings AS bldngs
			INNER JOIN irvs.enhanced_building_risk AS ebr
			ON bldngs.building_id = ebr.building_id
			WHERE bldngs.building_id IN ('${ buildingids.join("','") }')
		`
		return db_service.promise(sql);
	}
}