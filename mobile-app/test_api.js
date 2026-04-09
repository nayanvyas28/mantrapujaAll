const https = require('https');

const encoded = 'NjUxNTUwOmFrLTY2YjkwOTZmNDc1MGRiNDBiYWMzNjNjM2FiNTJhMDAxMjIzMTlkMA=='; // base64(651550:ak-66b9...)
const data = "day=12&month=3&year=1993&hour=14&min=15&lat=19.076&lon=72.8777&tzone=5.5";

function test(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'json.astrologyapi.com',
      port: 443,
      path: '/v1/' + path,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encoded}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve({ path, status: res.statusCode, body }));
    });
    req.write(data);
    req.end();
  });
}

(async () => {
  console.log('Testing general_house_report/sun:', await test('general_house_report/sun'));
})();
