const https = require("https");

module.exports = url => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        reject(new Error(`URL ${ url } failed, with: ${ statusCode }`));
      }
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        }
        catch (e) {
          reject(e);
        }
      });
      res.on('error', e => {
        reject(e);
      });
    })
  })
}