
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
	"flood_zone",
	"prop_class",
	"flood_velocity",
	"flood_depth",
	"flood_base_elevation",
	'num_units',
	'basement',
	'num_stories',
	'building_type',
	'roof_type',
	'address',
	'num_residents',
	'heat_type',
	'naics_code',
	'census_industry_code',
	'contents_replacement_value',
	'inventory_replacement_value',
	'establishment_revenue',
	'business_hours',
	'seismic_zone',
	'flood_plain',
	'flood_duration',
	'high_wind_speed',
	'soil_type',
	'storage_hazardous_materials',
	'topography',
	'critical_infrastructure',
	'num_occupants',
	'num_vehicles_inhabitants',
	'height',
	'structure_type',
	'bldg_style',
	'sqft_living',
	'nbr_kitchens',
	'nbr_full_baths',
	'nbr_bedrooms',
	'first_floor_elevation',
	'num_employees'


];


module.exports = {
	ATTRIBUTES,

	length: (db_service, geoids,buildingOwners) => {
		if(buildingOwners){
			const queries = getGeoidLengths(geoids).map(geoLen => {
				const filteredGeoids = geoids.filter(d => d.length === geoLen),
					sql = `
        	SELECT
        		${ geoLen === 10 ?
						`cousub_geoid`
						: `substring(a.geoid, 1, ${ geoLen })`
					} AS geoid,c.owner_type,
        		count(1) AS length
        	FROM irvs.buildings_2018 as a 
        	JOIN parcel.parcel_2017_36 as c on a.parcel_id = c.objectid
        	WHERE
        		${ geoLen === 10 ?
						`cousub_geoid`
						: `substring(a.geoid, 1, ${ geoLen })`
					} IN ('${ filteredGeoids.join(`','`) }') AND c.owner_type IN  ('${buildingOwners.join(`','`)}')
	        GROUP BY 1,2
      	`;
				//console.log("SQL:",sql);
				return db_service.promise(sql);

			})

			return Promise.all(queries)
				.then(data => {
					return [].concat(...data)
				})
		}
		else{
			const queries = getGeoidLengths(geoids).map(geoLen => {
				const filteredGeoids = geoids.filter(d => d.length === geoLen),
					sql = `
        	SELECT
        		${ geoLen === 10 ?
						`cousub_geoid`
						: `substring(a.geoid, 1, ${ geoLen })`
					} AS geoid,
        		count(1) AS length
        	FROM irvs.buildings_2018 as a 
        	WHERE
        		${ geoLen === 10 ?
						`cousub_geoid`
						: `substring(a.geoid, 1, ${ geoLen })`
					} IN ('${ filteredGeoids.join(`','`) }')
	        GROUP BY 1
      	`;
				//console.log("SQL:",sql);
				return db_service.promise(sql);

			});
			return Promise.all(queries)
				.then(data => {
					return [].concat(...data)
				})
		}

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
		const sql = `
			SELECT id AS id,
				${ cols.join() }
			FROM irvs.buildings_2018 as a
			join irvs.enhanced_building_risk as b on a.id = b.building_id 
			WHERE id IN (${ buildingids });
		`;
		return db_service.promise(sql);

	},

	buildingOwnerByTypeByValue : (db_service,geoids,buildingOwners) =>{
		const queries = getGeoidLengths(geoids).map(geoLen => {
			const filteredGeoids = geoids.filter(d => d.length === geoLen),
				sql = `
					SELECT
        		${ geoLen === 10 ?
					`a.cousub_geoid`
					: `substring(a.geoid, 1, ${ geoLen })`
				} AS geoid,c.owner_type,
        		count(b.building_type) as count,
        		sum(b.replacement_value) as replacement_value
          FROM irvs.buildings_2018 AS a
          join irvs.enhanced_building_risk as b on a.id = b.building_id 
		  join parcel.parcel_2017_36 as c on a.parcel_id = c.objectid
          WHERE
        		${ geoLen === 10 ?
					`a.cousub_geoid`
					: `substring(a.geoid, 1, ${ geoLen })`
				} IN ('${ filteredGeoids.join(`','`) }') AND c.owner_type IN  ('${buildingOwners.join(`','`)}')
                   GROUP BY 1,2`;
			return db_service.promise(sql);
		});

		return Promise.all(queries)
			.then(data => [].concat(...data));
	},

	buildingByLandUseType : (db_service,geoids,propType) =>{
		const queries = getGeoidLengths(geoids).map(geoLen => {
			const filteredGeoids = geoids.filter(d => d.length === geoLen),
				sql =
					`SELECT
					${geoLen === 10 ?
						`a.cousub_geoid`
						: `substring(a.geoid, 1, ${geoLen})`
					} AS geoid,prop_class,
				count(1) as count,
				sum(replacement_value) as replacement_value
				FROM irvs.buildings_2018 AS a
				join irvs.enhanced_building_risk as b on a.id = b.building_id 
				WHERE
				${geoLen === 10 ?
						`a.cousub_geoid`
						: `substring(a.geoid, 1, ${geoLen})`
					} IN ('${filteredGeoids.join(`','`)}') 
				AND prop_class IN ('${ propType.join(`','`) }')
			   GROUP BY 1,2`;
			// check if number includes 0 in trailing spaces and update the AND clause
			return db_service.promise(sql);
		});

		return Promise.all(queries)
			.then(data => [].concat(...data));

	},

	summary : (db_service,geoids,hazardRisk,zones) =>{
		const queries = getGeoidLengths(geoids).map(geoLen =>{
			const filteredGeoids = geoids.filter(d => d.length === geoLen),
				sql =
					`SELECT
					${ geoLen === 10 ?
						`a.cousub_geoid`
						: `substring(a.geoid, 1, ${ geoLen })`
					} AS geoid,${hazardRisk},
					COUNT(1) AS count,
					SUM(replacement_value) AS replacement_value
					FROM irvs.buildings_2018 AS a
					join irvs.enhanced_building_risk AS b on a.id = b.building_id
					WHERE
        		${ geoLen === 10 ?
						`a.cousub_geoid`
						: `substring(a.geoid, 1, ${ geoLen })`
					} IN ('${ filteredGeoids.join(`','`) }') 
        		AND ${hazardRisk} IN ('${ zones.join(`','`) }')
        		GROUP BY 1,2
					`;
			return db_service.promise(sql)
		})
		//});
		return Promise.all(queries)
			.then(data => [].concat(...data));
	},
	update: (db_service, updates) => {
		return Promise.all(
			Object.keys(updates)
				.map(id => {
					const keys = Object.keys(updates[id]).filter(key => !['id'].includes(key)),
						sql = `
							UPDATE irvs.enhanced_building_risk
							SET ${ keys.map((key, i) => `${ key } = $${ i + 1 }`) }
							WHERE building_id = $${ keys.length + 1 }
							RETURNING *;
						`,
						args = [
							...keys.map(key => updates[id][key] === null ? null : updates[id][key].value || updates[id][key]),
							id
						];
					return db_service.promise(sql, args);
				})
		)
			.then(results => [].concat(...results));
	},
};

/*
(prop_class ~ '${propType.map(prop => prop.toString().includes('0') ? '^' + prop.toString().replace(/^0+|0+$/g, "") :
							prop.toString().replace(/^0+|0+$/g, "")).join('|')}'
				)

 */

/*
"prop_class",
	"replacement_value",
	"critical",
	"flood_zone",
	"flood_velocity",
    "flood_depth",
    "flood_base_elevation",
    'num_units',
    'basement',
    'num_stories',
    'building_type',
    'roof_type',
	'address',
	'num_residents',
	'num_employees',



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
 */
