let metadata = require('../routes/metadata'),
    HAZARD_META = metadata.HAZARD_META
    hazards = metadata.hazards,
    secondary = metadata.secondary,

    { getGeoidLengths } = require("./utils");

const HazardsByGeoid = function RiskIndexHazardGeo( db_service, geoids, hazardIds ) {
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
            substring(geoid,1,${geoLen}) as geoid,
            ${hazardIds.map(haz => `AVG(CASE WHEN ${haz}_score >= 0.01 THEN  ${haz}_score ELSE NULL END) as ${haz}_score`).join(',')}
          FROM risk_index.risk_index
            where substring(geoid,1,${geoLen}) in  ('${filteredGeoids.join(`','`)}')
          group by substring(geoid,1,${geoLen})
        `;

        // sql query for debugging
        // console.log(sql)

        // run query resolve rows
        db_service.query(sql, [], (err, data) => {
          if (err) reject(err);
          resolve(data.rows)
        });
      })
    })
    
    //run all queries and resolve flattened 1-dimensional array
    Promise.all(queries).then(riskData => {
      resolve([].concat(...riskData))
    })
  });
};

const riskIndexOthers = (db_service, geoids) => {
  const queries = getGeoidLengths(geoids)
    .map(geoLen => {
      const filteredGeoids = geoids.filter(d => d.length === geoLen),
        sql = `
          SELECT
            substring(geoid, 1 ,${geoLen}) AS geoid,
            nri,
            bric,
            sovi,
            sovist,
            builtenv
          FROM risk_index.risk_index
          WHERE substring(geoid, 1, ${geoLen}) IN ('${ filteredGeoids.join(`','`) }')
        `;
// console.log("SQL:",sql);
      return db_service.promise(sql);
    })
  return Promise.all(queries)
    .then(results => [].concat(...results))
}

module.exports = {
  HazardsByGeoid,
  riskIndexOthers
}