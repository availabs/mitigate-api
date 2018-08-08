const { getGeoidLengths } = require("./utils");

const ATTRIBUTES = [
	"fema_disaster_number",
	"geoid",
	"total_loss",
	"loan_type",
	"hazardid",
	"year",
	"loan_total",
	"entry_id"
]
const toString = d => d && d.toString();
const toNum = d => d && +d;
const COERCE = {
	"fema_disaster_number": toString,
	"geoid": toString,
	"total_loss": toNum,
	"loan_type": toString,
	"hazardid": toString,
	"year": toNum,
	"loan_total": toNum,
	"entry_id": toNum
}

sbaByGeoByYear = function(db_service, geoids, hazardids, years) {
	let queries = getGeoidLengths(geoids).map(geoLen => {
	  	let filteredGeoids = geoids.filter(d => d.length === geoLen);
	  	const sql = `
	    	SELECT
	    		loan_type,
	      		substring(geoid, 1, ${ geoLen }) AS geoid,
	      		hazardid,
	      		extract(year FROM fema_date) AS year,
	      		count(1) AS num_loans,
	      		sum(total_verified_loss) AS total_loss,
	      		sum(total_approved_loan_amount) AS loan_total
	    	FROM public.sba_disaster_loan_data
	    	WHERE substring(geoid, 1, ${ geoLen }) IN ('${ filteredGeoids.join(`','`) }')
		    AND extract(year FROM fema_date) IN (${ years.join(',') })
		    AND hazardid IN ('${ hazardids.join(`','`) }')
		    GROUP BY 1, 2, 3, 4
	  	`;
// console.log("SQL:",sql);
	  	return db_service.promise(sql);
	})
	return Promise.all(queries)
	  	.then(data => [].concat(...data));
} // END sbaByGeoByYear

sbaEventsLength = function(db_service, geoids, hazardids, years) {
    let queries = getGeoidLengths(geoids).map(geoLen => {
      	let filteredGeoids = geoids.filter(d => d.length === geoLen);
      	const sql = `
        	SELECT
	      		substring(geoid, 1, ${ geoLen }) AS geoid,
	      		hazardid,
	      		extract(year FROM fema_date) AS year,
          		count(1) AS length
        	FROM public.sba_disaster_loan_data
        	WHERE substring(geoid, 1, ${ geoLen }) IN ('${ filteredGeoids.join(`','`) }')
	        AND extract(year FROM fema_date) IN (${ years.join(',') })
	        AND hazardid IN ('${ hazardids.join(`','`) }')
	        GROUP BY 1, 2, 3
      	`;
// console.log("SQL:",sql);
      	return db_service.promise(sql);
    })
    return Promise.all(queries)
      	.then(data => [].concat(...data));
} // END sbaEventsLength


sbaEventsByIndex = function(db_service, geoids, hazardids, years) {
    let queries = getGeoidLengths(geoids).map(geoLen => {
      	let filteredGeoids = geoids.filter(d => d.length === geoLen);
      	const sql = `
	        SELECT
	      		substring(geoid, 1, ${ geoLen }) AS geoid,
          		hazardid,
          		extract(year FROM fema_date) AS year,
          		entry_id
        	FROM public.sba_disaster_loan_data
        	WHERE substring(geoid, 1, ${ geoLen }) IN ('${ filteredGeoids.join(`','`) }')
	        AND extract(year FROM fema_date) IN (${ years.join(',') })
    	    AND hazardid IN ('${ hazardids.join(`','`) }')
      	`;
// console.log("SQL:",sql);
      return db_service.promise(sql)
    })
    return Promise.all(queries)
      .then(data => [].concat(...data));
} // END sbaEventsByIndex

const sbaEventsByEntryIdSql = entry_ids =>
`
	SELECT fema_disaster_number,
		total_verified_loss AS total_loss,
		total_approved_loan_amount AS loan_total,
		loan_type,
		hazardid,
		geoid,
		extract(year FROM fema_date) AS year,
		entry_id
	FROM public.sba_disaster_loan_data
	WHERE entry_id IN (${ entry_ids });
`
const sbaEventsByEntryId = (db_service, entry_ids) => {
	const sql = sbaEventsByEntryIdSql(entry_ids);
// console.log(sql);
	return db_service.promise(sql)
}

module.exports = {
	sbaByGeoByYear,
	sbaEventsLength,
	sbaEventsByIndex,
	sbaEventsByEntryId,
	ATTRIBUTES,
	COERCE
}