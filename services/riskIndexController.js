let metadata = require('../routes/metadata'),
    HAZARD_META = metadata.HAZARD_META
    hazards = metadata.hazards,
    secondary = metadata.secondary;

const HazardsByGeoid = function RiskIndexHazardGeo( db_service, geoids ) {
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
            ${hazards.map(haz => `AVG(CASE WHEN ${haz} >= 0.01 THEN  ${haz} ELSE NULL END) as ${haz}_value`).join(',')},
            ${hazards.map(haz => `AVG(CASE WHEN ${haz}_score >= 0.01 THEN  ${haz}_score ELSE NULL END) as ${haz}_score`).join(',')},
            ${secondary.map(haz => `AVG(CASE WHEN ${haz} >= 0.01 THEN  ${haz} ELSE NULL END) as ${haz}`).join(',')}
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

module.exports = {
  HazardsByGeoid
}