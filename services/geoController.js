const {
  EARLIEST_DATA_YEAR,
  LATEST_DATA_YEAR
} = require("./utils/censusApiUtils")

const typeTables = {
   '2': 'us_state',
   '5': 'us_county',
   '10': 'cousub',
   '11': 'tract',
   'county': 'us_county',
   'tract': 'tract',
   'cousub': 'cousub'
}

const {
  fillCensusApiUrlArray,
  processCensusApiRow
} = require("./utils/censusApiUtils");

const fetch = require("./utils/fetch");

const ChildrenByGeoid = function ChildrenByGeoid(db_service, geoids, type) {
  return new Promise((resolve, reject) => {

// console.log(geoids)
    let queries = geoids.map(geoid => {
      return new Promise((resolve, reject) => {
        
        const sql = `
          SELECT 
            geoid
          FROM geo.tl_2017_${typeTables[type]}
            where geoid like '${geoid}%'
        `

        // sql query for debugging
// console.log(sql,type, typeTables[type])
        
        // run query resolve rows
        db_service.query(sql, [], (err, data) => {
          if (err) reject(err);
          resolve([
            geoid, 
            data.rows.map(d => d.geoid)
          ])
        });
      })
    })
    
    Promise.all(queries).then(geoData => {
      resolve(
        geoData.reduce((out, curr) => {
          //{36: [36001,...] }
          out[curr[0]] = curr[1]
          return out
        }, {})
      )
    })
  })
}


const GeoByGeoid = function GeoByGeoid( db_service, geoids ) {
  return new Promise((resolve, reject) => {
    
    // split geography type by geoid length
    let geoidLengths = geoids.reduce((out, g) => {
      if (!out.includes(g.length)) { out.push(g.length) }   
      return out 
    }, [])
    
    // create query promises for all geography types
    let queries = geoidLengths.map(geoLen => {
      return new Promise((resolve, reject) => {
        let filteredGeoids = geoids.filter(d => d.length === geoLen)
        // console.log('geoids', geoids,filteredGeoids)
        
        const sql = `
          SELECT 
            geoid,
            namelsad as name 
          FROM geo.tl_2017_${typeTables[geoLen]}
            where geoid in ('${filteredGeoids.join(`','`)}')
        `

        // sql query for debugging
// console.log(sql)
        
        // run query resolve rows
        db_service.query(sql, [], (err, data) => {
          if (err) reject(err);
          resolve(data ? data.rows : [])
        });
      })
    })
    
    //run all queries and resolve flattened 1-dimensional array
    Promise.all(queries).then(riskData => {
      resolve([].concat(...riskData))
    })
  });
};

const _CensusAcsByGeoidByYear = (db_service, geoids, years) => {
  const urls = fillCensusApiUrlArray(geoids, years);
  return Promise.all(generateCensusAcsByGeoidByYearFetches(urls))
    .then(data => [].concat(...data));
}

const CensusAcsByGeoidByYear = (db_service, geoids, years) => {
  const queries = years.map(year => {
    const sql = `
      WITH minus_5 AS (
        SELECT geoid,
        population,
        poverty,
        non_english_speaking,
        under_5,
        over_64,
        non_english_speaking + under_5 + over_64 AS vulnerable
        FROM public.acs_data
        WHERE geoid in ('${ geoids.join("','") }')
        AND year = ${ Math.min(Math.max(EARLIEST_DATA_YEAR, year - 5), LATEST_DATA_YEAR) }
      )

      SELECT acs.geoid,
        acs.year,
        acs.population,
        acs.poverty,
        acs.non_english_speaking,
        acs.under_5,
        acs.over_64,
        acs.non_english_speaking + acs.under_5 + acs.over_64 AS vulnerable,

        acs.population - minus_5.population AS population_change,
        acs.poverty - minus_5.poverty AS poverty_change,
        acs.non_english_speaking - minus_5.non_english_speaking AS non_english_speaking_change,
        acs.under_5 - minus_5.under_5 AS under_5_change,
        acs.over_64 - minus_5.over_64 AS over_64_change,
        acs.non_english_speaking + acs.under_5 + acs.over_64 - minus_5.vulnerable AS vulnerable_change

      FROM public.acs_data AS acs
      JOIN minus_5
      ON acs.geoid = minus_5.geoid
      WHERE acs.geoid in ('${ geoids.join("','") }')
      AND acs.year = ${ Math.min(Math.max(EARLIEST_DATA_YEAR, year), LATEST_DATA_YEAR) }
    `
// console.log(sql);
    return db_service.promise(sql);
  })
  return Promise.all(queries)
    .then(data => [].concat(...data));
}

module.exports = {
  GeoByGeoid,
  ChildrenByGeoid,
  CensusAcsByGeoidByYear
}

const generateCensusAcsByGeoidByYearFetches = urls =>
  urls.map(([year, url]) =>
    fetch(url)
      .then(data =>
        data.slice(1) // ignore description row
          .map(d => processCensusApiRow(d, year))
      )
  )