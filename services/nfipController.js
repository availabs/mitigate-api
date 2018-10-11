const { getGeoidLengths } = require("./utils");

module.exports = {
	byGeoidAllTime: (db_service, geoids) => {
	    const queries = getGeoidLengths(geoids).map(geoLen => {
	      	const filteredGeoids = geoids.filter(d => d.length === geoLen),
	      		sql = `
		        	SELECT
		        		${ geoLen === 10 ?
			              	`cousub_geoid`
			              	: `substring(geoid, 1, ${ geoLen })`
			            } AS geoid,
		          		count(1) AS num_losses,
		          		sum(building_payment + contents_payment) AS total_loss,
		          		sum(building_payment) AS building_loss,
		          		sum(contents_payment) AS contents_loss,
		          		sum(CASE WHEN mitigated = true THEN 1 ELSE 0 END) AS num_mitigated,
		          		count(DISTINCT nfip.prop_locatr) AS num_properties
    		        	FROM public.nfip_losses AS losses INNER JOIN public.nfip AS nfip ON losses.prop_locatr = nfip.prop_locatr
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
	}
}