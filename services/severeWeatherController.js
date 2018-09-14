const { getGeoidLengths } = require("./utils");

const EARLIEST_YEAR = 1996,
  LATEST_YEAR = 2017,
  YEARS_OF_DATA = [];
for (let year = EARLIEST_YEAR; year <= LATEST_YEAR; ++year) {
  YEARS_OF_DATA.push(year);
}
const NUM_YEARS = YEARS_OF_DATA.length;

module.exports = {
  EARLIEST_YEAR,
  LATEST_YEAR,
  YEARS_OF_DATA,
  NUM_YEARS,

  tractTotals: (db_service, geoids) => {
    const queries = getGeoidLengths(geoids).map(geoLen => {
      const filteredGeoids = geoids.filter(d => d.length === geoLen),
        sql = `
          SELECT
            ${ `substring(geoid, 1, ${ geoLen })` } AS geoid,
            SUM(wind) AS wind,
            SUM(wildfire) AS wildfire,
            SUM(tsunami) AS tsunami,
            SUM(tornado) AS tornado,
            SUM(riverine) AS riverine,
            SUM(lightning) AS lightning,
            SUM(landslide) AS landslide,
            SUM(icestorm) AS icestorm,
            SUM(hurricane) AS hurricane,
            SUM(heatwave) AS heatwave,
            SUM(hail) AS hail,
            SUM(earthquake) AS earthquake,
            SUM(drought) AS drought,
            SUM(avalanche) AS avalanche,
            SUM(coldwave) AS coldwave,
            SUM(winterweat) AS winterweat,
            SUM(volcano) AS volcano,
            SUM(coastal) AS coastal
          FROM severe_weather.total_damage_by_tract
          WHERE ${
            `substring(geoid, 1, ${ geoLen })`
          } IN ('${ filteredGeoids.join(`','`) }')
          GROUP BY 1
        `;
// console.log("SQL:",sql);
      return db_service.promise(sql);
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  },

  // ['num_events', 'num_episodes', 'num_severe_events',
  //     'total_damage', 'property_damage', 'crop_damage',
  //     'injuries', 'fatalities', 'annualized_damage', 'annualized_num_events',
  //     'annualized_num_severe_events', 'daily_event_prob', 'daily_severe_event_prob']

  severeWeatherAllTime: function(db_service, geoids, hazardTypes) {
    const queries = getGeoidLengths(geoids).map(geoLen => {
      const filteredGeoids = geoids.filter(d => d.length === geoLen),
        sql = `
          SELECT
            ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
            event_type AS hazard,
            count(1) AS num_events,
            count(DISTINCT episode_id) as num_episodes,
            sum(CASE WHEN property_damage > 1000000 THEN 1 ELSE 0 END) as num_severe_events,
            sum(injuries_direct) AS injuries,
            sum(deaths_direct) AS fatalities,
            sum(property_damage + crop_damage) AS total_damage,
            sum(property_damage) AS property_damage,
            sum(crop_damage) AS crop_damage,
            count(1) / ${ NUM_YEARS } AS annualized_num_events,
            sum(property_damage + crop_damage) / ${ NUM_YEARS } AS annualized_damage,
            sum(CASE WHEN property_damage > 1000000 THEN 1 ELSE 0 END) / ${ NUM_YEARS } as annualized_num_severe_events,
            count(1)::DOUBLE PRECISION / ${ NUM_YEARS }.0 / 365.0 AS daily_event_prob,
            sum(CASE WHEN property_damage > 1000000 THEN 1 ELSE 0 END)::DOUBLE PRECISION / ${ NUM_YEARS }.0 / 365.0 AS daily_severe_event_prob
          FROM severe_weather.details
          WHERE ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } IN ('${ filteredGeoids.join(`','`) }')
          AND year >= ${ EARLIEST_YEAR }
          AND event_type IN ('${ hazardTypes.join(`','`) }')
          GROUP BY 1, 2
        `;
// console.log("SQL:",sql);
      return db_service.promise(sql);
    })

    return Promise.all(queries)
      .then(data => [].concat(...data));
  },

  SevereWeatherByGeoByYear: function(db_service, geoids, hazardTypes, years) {
    
    // create query promises for all geography types
    let queries = getGeoidLengths(geoids).map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT
          ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
          event_type AS hazard,
          year, 
          count(1) AS num_events,
          count(distinct episode_id) as num_episodes,
          sum(CASE WHEN property_damage > 1000000 THEN 1 ELSE 0 END) as num_severe_events,
          sum(injuries_direct) AS injuries,
          sum(deaths_direct) AS fatalities,
          sum(property_damage + crop_damage) as total_damage,
          sum(property_damage) AS property_damage,
          sum(crop_damage) AS crop_damage
        FROM severe_weather.details
        WHERE ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } IN ('${ filteredGeoids.join(`','`) }')
        AND year IN (${ years.join(',') })
        AND event_type IN ('${ hazardTypes.join(`','`) }')
        GROUP BY 1, 2, 3
      `;
      // console.log("SQL:",sql);
      return db_service.promise(sql);
    })

    return Promise.all(queries)
      .then(data => {
        return [].concat(...data)
      });
  }, // END SevereWeatherByGeoByYear

  SevereWeatherEventsLengthByGeoByYear: function(db_service, geoids, hazardTypes, years) {
    // create query promises for all geography types
    let queries = getGeoidLengths(geoids).map(geoLen => {
      let filteredGeoids = geoids.filter(d => d.length === geoLen);
      const sql = `
        SELECT
          ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
          event_type AS hazard,
          year,
          count(1) AS length
        FROM severe_weather.details
        WHERE ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
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
          ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
          event_type AS hazard,
          year,
          property_damage,
          magnitude,
          ST_AsGeoJson(begin_coords_geom) AS geom
        FROM severe_weather.details
        WHERE ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
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
          ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
            } AS geoid,
          event_type AS hazard,
          year,
          event_id
        FROM severe_weather.details
        WHERE ${ geoLen == 10 ?
              `cousub_geoid`:
              `substring(geoid, 1, ${ geoLen })`
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
        swd.geoid,
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
        crop_damage,
        namelsad AS municipality,
        cz_name AS county,
        begin_date_time::TEXT AS date
      FROM severe_weather.details AS swd
        LEFT OUTER JOIN geo.tl_2017_36_cousub AS geotl
        ON cousub_geoid = geotl.geoid
      WHERE event_id IN (${ event_ids })
    `;
// console.log("SQL:",sql)
    return db_service.promise(sql);
  }

};