const http = require('http');
const https = require('https');
const endpoints = require('./endpoints');

let success = [],
    fail = [];
for (let uri of endpoints) {
    https
        .get(uri, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                success.push({ endpoint: uri, status: res.statusCode });
            } else {
                fail.push({ endpoint: uri, status: res.statusCode });
            }
        })
        .on('error', (err) => {
            console.log('Error: ', err.message);
        });
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const url = req.url;

    if (url === '/') {
        res.write(
            JSON.stringify({
                success: true,
                message: 'Nice Message',
                data: {
                    success: success,
                    failed: fail
                }
            })
        );
        res.end();
    } else {
        res.statusCode = 404;
        res.write('404 Not found');
        res.end();
    }
}).listen(3000, function () {
    console.log('server start at port 3000');
});
