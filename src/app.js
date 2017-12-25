/*
* @Author: dangxiaoli
* @Date:   2017-12-25 20:08:21
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-25 20:46:24
*/

const http = require('http');
const chalk = require('chalk');

const conf = require('./config/defaultConfig.js');

const server = http.createServer((req, res) => {
    debugger
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('Hello World!!');
    res.write('</body>');
    res.write('</html>');

    res.end();
})



server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`

    console.log(`Server started at ${chalk.green(addr)}`)
})
