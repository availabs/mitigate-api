module.exports = {
  SevereWeatherByGeoByYear: function(db_service, geoids, hazardTypes, years) {
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
          ${ geoLen <= 5 ?
            `substring(geoid, 1, ${ geoLen })`
            : `cousub_geoid`
          } AS geoid,
          event_type AS hazard,
          year, 
          count(1) AS num_events,
          sum(injuries_direct) AS injuries,
          sum(deaths_direct) AS fatalities,
          sum(property_damage) AS property_damage,
          sum(crop_damage) AS crop_damage
        FROM severe_weather.details
        WHERE ${ geoLen <= 5 ?
          `substring(geoid, 1, ${ geoLen })`
          : `cousub_geoid`
        } IN ('${ filteredGeoids.join(`','`) }')
        AND year IN (${ years.join(',') })
        AND event_type IN ('${ hazardTypes.join(`','`) }')
        GROUP BY 1, 2, 3
      `;
// console.log("SQL:",sql);
      return db_service.promise(sql);
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  }, // END SevereWeatherByGeoByYear

  SevereWeatherEventsLengthByGeoByYear: function(db_service, geoids, hazardTypes, years) {

    let geoidLengths = geoids.reduce((out, g) => {
      if (!out.includes(g.length)) { out.push(g.length) };
      return out;
    }, []);
    
    // create query promises for all geography types
    let queries = geoidLengths.map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT 
          ${ geoLen <= 5 ?
            `substring(geoid, 1, ${ geoLen })`
            : `cousub_geoid`
          } AS geoid,
          event_type AS hazard,
          year,
          count(1) AS length
        FROM severe_weather.details
        WHERE ${ geoLen <= 5 ?
          `substring(geoid, 1, ${ geoLen })`
          : `cousub_geoid`
        } IN ('${ filteredGeoids.join(`','`) }')
        AND year IN (${ years.join(',') })
        AND event_type IN ('${ hazardTypes.join(`','`) }')
        GROUP BY 1, 2, 3
      `;
// console.log("SQL:",sql);
      return db_service.promise(sql);
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  }, // END SevereWeatherEventsLengthByGeoByYear

  SevereWeatherEventsByGeoByYear: function(db_service, geoids, hazardTypes, years) {

    let geoidLengths = geoids.reduce((out, g) => {
      if (!out.includes(g.length)) { out.push(g.length) };
      return out;
    }, []);
    
    // create query promises for all geography types
    let queries = geoidLengths.map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT 
          ${ geoLen <= 5 ?
            `substring(geoid, 1, ${ geoLen })`
            : `cousub_geoid`
          } AS geoid,
          event_type AS hazard,
          year,
          property_damage,
          magnitude,
          ST_AsGeoJson(begin_coords_geom) AS geom
        FROM severe_weather.details
        WHERE ${ geoLen <= 5 ?
          `substring(geoid, 1, ${ geoLen })`
          : `cousub_geoid`
        } IN ('${ filteredGeoids.join(`','`) }')
        AND year IN (${ years.join(',') })
        AND event_type IN ('${ hazardTypes.join(`','`) }')
      `;
// console.log("SQL:",sql);
      return db_service.promise(sql)
//         .then(data => {
// console.log(sql, data);
// return data;
//         });
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  }

};