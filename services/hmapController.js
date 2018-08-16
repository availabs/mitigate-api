const { getGeoidLengths } = require("./utils");

const toString = d => d && d.toString();
const toNum = d => d && +d;

module.exports = {

  hmapLengths: (db_service, geoids, incidentTypes, years) => {
    const queries = getGeoidLengths(geoids).map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT
          substring(geoid, 1, ${ geoLen }) AS geoid,
          incidenttype,
          extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) AS year,
          count(1) AS length
        FROM public.hazard_mitigation_assistance_projects
        WHERE substring(geoid, 1, ${ geoLen }) IN ('${ filteredGeoids.join(`','`) }')
        AND extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) IN (${ years.join(',') })
        AND incidenttype IN ('${ incidentTypes.join(`','`) }')
        GROUP BY 1, 2, 3
      `;
// console.log("SQL:",sql);
      return db_service.promise(sql);
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  }, // END hmapLengths

  hmapIndices: (db_service, geoids, incidentTypes, years) => {
    // create query promises for all geography types
    const queries = getGeoidLengths(geoids).map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT
          substring(geoid, 1, ${ geoLen }) AS geoid,
          incidenttype,
          extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) AS year,
          projectidentifier AS project_id
        FROM public.hazard_mitigation_assistance_projects
        WHERE substring(geoid, 1, ${ geoLen }) IN ('${ filteredGeoids.join(`','`) }')
        AND extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) IN (${ years.join(',') })
        AND incidenttype IN ('${ incidentTypes.join(`','`) }')
      `;
// console.log("SQL:",sql);
      return db_service.promise(sql)
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  },

  	ATTRIBUTES: [
  		"project_id",
  		"hazardid",
  		"year",
  		"disasternumber",
  		"region",
  		"geoid",
  		"projecttype",
  		"projecttitle",
  		"projectcounties",
  		"numberofproperties",
  		"numberoffinalproperties",
  		"status",
  		"subgrantee",
  		"grantee",
  		"costsharepercentage",
  		"projectamount",
  		"federalshareobligated"
  	],

  	COERCE: {
  		"project_id": toString,
  		"hazardid": toString,
  		"year": toNum,
  		"disasternumber": toString,
  		"region": toString,
  		"geoid": toString,
  		"projecttype": toString,
  		"projecttitle": toString,
  		"projectcounties": toString,
  		"numberofproperties": toNum,
  		"numberoffinalproperties": toNum,
  		"status": toString,
  		"subgrantee": toString,
  		"grantee": toString,
  		"costsharepercentage": toNum,
  		"projectamount": toNum,
  		"federalshareobligated": toNum
  	},

  	hmapEventsById: (db_service, project_ids) => {
  		const sql = `
  			SELECT
		  		projectidentifier AS project_id,
		  		incidenttype,
		  		extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) AS year,
		  		disasternumber,
		  		region,
		  		geoid,
		  		projecttype,
		  		projecttitle,
		  		projectcounties,
		  		numberofproperties,
		  		numberoffinalproperties,
		  		status,
		  		subgrantee,
		  		grantee,
		  		costsharepercentage,
		  		projectamount,
		  		federalshareobligated
		  	FROM public.hazard_mitigation_assistance_projects
		  	WHERE projectidentifier IN ('${ project_ids.join("','") }')
  		`
// console.log(sql)
  		return db_service.promise(sql);
  	},

  	hmapYearsOfData: db_service => {
  		const sql = `
  			SELECT DISTINCT extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) AS year
			FROM public.hazard_mitigation_assistance_projects
			WHERE extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) > 1900
			AND extract(year FROM COALESCE(dateapproved, dateinitiallyapproved)) IS NOT NULL
			ORDER BY year
  		`
  		return db_service.promise(sql);
  	}

}