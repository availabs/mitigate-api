const http = require("http"),
  https = require("https"),

  regex = /^https:\/\//;

module.exports = url => {
  const SERVICE = regex.test(url) ? https : http;
  return new Promise((resolve, reject) => {
    SERVICE.get(url, res => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        return reject(new Error(`URL ${ url } failed, with: ${ statusCode }`));
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
      res.on('error', reject);
    })
  })
}