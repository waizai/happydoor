/*
* @Author: dangxiaoli
* @Date:   2017-12-25 20:08:21
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-01 20:16:47
*/
//处理路径  尽量使用绝对路径

const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig.js');
const router = require('./helper/router.js');
const openUrl = require('./helper/openUrl.js');



class Server {
    constructor(config){
        this.conf = Object.assign({}, conf, config);
    }
    start(){
        //1.启动http serve
        //步骤1以后都是假设请求抵达后
        const server = http.createServer((req, res) => {
            //2.以设置的静态文件目录为base，映射得到文件位置  作用:连接路径
            const filePath = path.join(this.conf.root, req.url);

            router(req, res, filePath, this.conf)
        })



        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`

            console.log(`Server started at ${chalk.green(addr)}`)
            openUrl(addr);
        })
    }
}

module.exports = Server;











    // fs.stat(filePath,(err, stats) => {
    //     if(err){
    //         res.statusCode = 404;
    //         res.setHeader('Content-Type', 'text/plain');
    //         res.end(`${filePath} is not a directory or a file`);
    //     }
    //     if(stats.isFile()){
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'text/plain');
    //         // fs.readFile(filePath,(err, data) => {
    //         //     res.end(data)
    //         // })

    //         // 返回一个新建的 ReadStream 对象
    //         // 流（stream）形式，所以必须通过pipe管道命令中介
    //         fs.createReadStream(filePath).pipe(res);
    //     }else if(stats.isDirectory()){
    //         //readdir方法用于读取目录，返回一个所包含的文件和子目录的数组。
    //         fs.readdir(filePath,(err, files) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'text/plain');
    //             res.end(files.join(','))
    //         })
    //     }
    // })
