const { getGeoidLengths } = require("./utils");

module.exports = {
  SevereWeatherByGeoByYear: function(db_service, geoids, hazardTypes, years) {
    
    // create query promises for all geography types
    let queries = getGeoidLengths(geoids).map(geoLen => {
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
    // create query promises for all geography types
    let queries = getGeoidLengths(geoids).map(geoLen => {
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
    
    // create query promises for all geography types
    let queries = getGeoidLengths(geoids).map(geoLen => {
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
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  }, // END SevereWeatherEventsByGeoByYear

  SevereWeatherEventIds: function(db_service, geoids, hazardTypes, years) {
        
    // create query promises for all geography types
    let queries = getGeoidLengths(geoids).map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT
          ${ geoLen <= 5 ?
            `substring(geoid, 1, ${ geoLen })`
            : `cousub_geoid`
          } AS geoid,
          event_type AS hazard,
          year,
          event_id
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
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  }, // END SevereWeatherEventsByIndices

// 'geoid', 'year', 'hazardid', 'property_damage',
// 'magnitude', 'episode_narrative', 'event_narrative',
// 'geom', 'event_id', 'episode_id', 'injuries', 'fatalities',
// 'crop_damage'
  SevereWeatherEventsById: function(db_service, event_ids) {
    const sql = 
    `
      SELECT 
        geoid,
        cousub_geoid,
        year,
        event_type AS hazard,
        property_damage,
        magnitude,
        episode_narrative,
        event_narrative,
        episode_id,
        event_id,
        ST_AsGeoJson(begin_coords_geom) AS begin_geom,
        ST_AsGeoJson(end_coords_geom) AS end_geom,
        injuries_direct AS injuries,
        deaths_direct AS fatalities,
        crop_damage
      FROM severe_weather.details
      WHERE event_id IN (${ event_ids })
    `;
    return db_service.promise(sql);
  }

};