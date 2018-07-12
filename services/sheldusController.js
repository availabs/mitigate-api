const SheldusByYearByGeoid = function RiskIndexHazardGeo( db_service, years, geoids ) {
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
            substring(fips_code::VARCHAR,1,${geoLen}) as geoid,
            extract(year from hazard_begin_date) as year, 
            unnest(string_to_array(hazard_type_combo,' - ')) as hazard,
            count(1) as num_events,
            sum(injuries) as injuries,
            sum(fatalities) as fatalities,
            sum(property_damage_adjusted_2012) as property_damage,
            sum(crop_damage_adjusted_2012) as crop_damage
          FROM sheldus.sheldus_ny_1960_2012_sheldus_ny_1960_2012
            where substring(fips_code::VARCHAR,1,${geoLen}) in ('${filteredGeoids.join(`','`)}')
              and extract(year from hazard_begin_date) in (${years.join(',')})
            group by 1,2,3 
            order by 1 desc`
        
        // sql query for debugging
        //console.log(sql)
        
        // run query resolve rows
        //console.time(`sheldus query ${geoLen}`)
        db_service.query(sql, [], (err, data) => {
          if (err) reject(err);
          //console.timeEnd(`sheldus query ${geoLen}`)
          resolve(data.rows)
        });
      })
    })
    
    //run all queries and resolve flattened 1-dimensional array
    //console.log('sheldus sending qs')
    //console.time('sheldus promise all')
    Promise.all(queries).then(riskData => {
      //console.timeEnd('sheldus promise all')
      resolve([].concat(...riskData))
    })
  });
};

module.exports = {
  SheldusByYearByGeoid
}




