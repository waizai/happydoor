/*
* @Author: dangxiaoli
* @Date:   2017-12-27 20:51:09
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-28 18:05:14
*/
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const path = require('path');
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');
const config = require('../config/defaultConfig.js');

const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath,'utf-8');
const template = Handlebars.compile(source);



module.exports = async function(req, res, filePath){
    try{
        //stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。
        //我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。
        const stats = await stat(filePath);

        if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // 返回一个新建的 ReadStream 对象
            // 流（stream）形式，所以必须通过pipe管道命令中介
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()){
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            const data = {
                title: path.basename(filePath),
                files,
                dir: path.relative(config.root, filePath),
            }
            res.end(files.join(','))
        }
    }catch(ex){
        console.error(ex)
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or a file`);
    }
}
