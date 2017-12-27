/*
* @Author: dangxiaoli
* @Date:   2017-12-25 20:08:21
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-27 21:21:42
*/
//处理路径  尽量使用绝对路径

const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig.js');
const router = require('./helper/router.js');
const Handlebars = require('handlebars');

const tplPath = path.join(__dirname,'./template/dir.tpl');
const source = fs.readFileSync(tplPath,'utf-8');
const template = Handlebars.compile(source);

const server = http.createServer((req, res) => {
    //以设置的静态文件目录为base，映射得到文件位置
    const filePath = path.join(conf.root, req.url);

    router(req, res, filePath)







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

})



server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`

    console.log(`Server started at ${chalk.green(addr)}`)
})






