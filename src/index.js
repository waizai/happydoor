/*
* @Author: dangxiaoli
* @Date:   2017-12-25 11:32:46
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-01 15:17:43
*/

const yargs = require('yargs');
const Server = require('./app.js');


const argv = yargs
    .usage('happydoor [options]')
    .option('p',{
        alias: 'port',
        describe: '端口号',
        default: 9527
    })
    .option('h',{
        alias: 'hostname',
        describe: 'host',
        default: '127.0.0.1'
    })
    .option('d',{
        alias: 'root',
        describe: 'root path',
        default: process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;


const server = new Server(argv);
server.start();
