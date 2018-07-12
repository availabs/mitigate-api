module.exports = {
  SevereWeatherByGeoByYear: function(db_service, years, geoids, hazardTypes) {
    // split geography type by geoid length
    let geoidLengths = geoids.reduce((out, g) => {
      if (!out.includes(g.length)) { out.push(g.length) };
      return out;
    }, []);
    
    // create query promises for all geography types
    let queries = geoidLengths.map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT 
          substring(geoid, 1, ${ geoLen }) AS geoid,
          (begin_yearmonth / 100)::INTEGER AS year, 
          event_type AS hazard,
          count(1) AS num_events,
          sum(injuries_direct) AS injuries,
          sum(deaths_direct) AS fatalities,
          sum(property_damage) AS property_damage,
          sum(crop_damage) AS crop_damage
        FROM severe_weather.details
          WHERE substring(geoid, 1, ${ geoLen }) IN ('${ filteredGeoids.join(`','`) }')
          AND (begin_yearmonth / 100)::INTEGER IN (${ years.join(',') })
          AND event_type IN ('${ hazardTypes.join(`','`) }')
          GROUP BY 1, 2, 3
          ORDER BY 1 DESC
      `;
      return db_service.promise(sql);
    })
    return Promise.all(queries)
      .then(data => [].concat(...data))
  } // END SevereWeatherByGeoByYear
};