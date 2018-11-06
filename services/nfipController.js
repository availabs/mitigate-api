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
		        	FROM public.nfip_losses AS losses
  		        	INNER JOIN public.nfip AS nfip
  		        	ON losses.prop_locatr = nfip.prop_locatr
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
	severeByGeoidAllTime: (db_service, geoids) => {
	    const queries = getGeoidLengths(geoids).map(geoLen => {
	      	const filteredGeoids = geoids.filter(d => d.length === geoLen),
	      		sql = `
	      			WITH
								severe1 AS (
									SELECT prop_locatr
									FROM (
										SELECT prop_locatr,
										COUNT(CASE WHEN building_payment >= 5000 THEN 1 ELSE 0 END) AS num
										FROM public.nfip_losses
										GROUP BY 1
									) AS foo
									WHERE num >= 4
								),
								severe2 AS (
									SELECT prop_locatr
									FROM (
										SELECT prop_locatr,
										sum(building_payment) AS total
										FROM (
											SELECT prop_locatr,
											building_payment,
											rank() OVER (
										    PARTITION BY prop_locatr
										    ORDER BY building_payment DESC
											)
											FROM public.nfip_losses
										) AS rank_filter
										WHERE RANK >= 2
										GROUP BY 1
									) AS foo
									WHERE total > 20000
								)
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
		        	FROM public.nfip_losses AS losses
  		        	INNER JOIN public.nfip AS nfip
  		        	ON losses.prop_locatr = nfip.prop_locatr
		        	WHERE
		        		${ geoLen === 10 ?
			              	`cousub_geoid`
			              	: `substring(geoid, 1, ${ geoLen })`
			            } IN ('${ filteredGeoids.join(`','`) }')
							AND (
								losses.prop_locatr IN (SELECT prop_locatr FROM severe1) OR
								losses.prop_locatr IN (SELECT prop_locatr FROM severe2)
							)
			        GROUP BY 1
		      	`;
// console.log("SQL:",sql);
	      	return db_service.promise(sql);
	    })
	    return Promise.all(queries)
	      	.then(data => [].concat(...data));
	},

	lossesByGeoidAllTime: (db_service, geoids) => {
	    const queries = getGeoidLengths(geoids).map(geoLen => {
	      	const filteredGeoids = geoids.filter(d => d.length === geoLen),
	      		sql = `
		        	SELECT
		        		${ geoLen === 10 ?
	              	`cousub_geoid`
	              	: `substring(geoid, 1, ${ geoLen })`
		            } AS geoid,
		            sum(total_losses) AS total_losses,
		            sum(closed_losses) AS closed_losses,
		            sum(open_losses) AS open_losses,
		            sum(cwop_losses) AS cwop_losses,
		            sum(total_payments) AS total_payments
			        FROM public.nfip_non_recurring AS nfip
		        	WHERE
		        		${ geoLen === 10 ?
	              	`cousub_geoid`
	              	: `substring(geoid, 1, ${ geoLen })`
		            } IN ('${ filteredGeoids.join(`','`) }')
		          GROUP BY 1
	      		`
	      	return db_service.promise(sql);
	    })
	    return Promise.all(queries)
	      	.then(data => [].concat(...data));
	},

	policiesByGeoidAllTime: (db_service, geoids) => {
	    const queries = getGeoidLengths(geoids).map(geoLen => {
	      	const filteredGeoids = geoids.filter(d => d.length === geoLen),
	      		sql = `
		        	SELECT
		        		${ geoLen === 10 ?
	              	`cousub_geoid`
	              	: `substring(geoid, 1, ${ geoLen })`
		            } AS geoid,
		            sum(policies) AS policies,
		            sum(insurance_whole) AS insurance_whole,
		            sum(written_premium) AS written_premium
			        FROM public.nfip_policies AS nfip
		        	WHERE
		        		${ geoLen === 10 ?
	              	`cousub_geoid`
	              	: `substring(geoid, 1, ${ geoLen })`
		            } IN ('${ filteredGeoids.join(`','`) }')
		          GROUP BY 1
	      		`
	      	return db_service.promise(sql);
	    })
	    return Promise.all(queries)
	      	.then(data => [].concat(...data));
	}
}