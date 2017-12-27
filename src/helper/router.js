/*
* @Author: dangxiaoli
* @Date:   2017-12-27 20:51:09
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-27 21:27:22
*/
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const path = require('path');
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');
const config = require('../config/defaultConfig.js');

const tplPath = path.join(__dirname,'./template/dir.tpl');
const source = fs.readFileSync(tplPath,'utf-8');
const template = Handlebars.compile(source);

module.exports = async function(req, res, filePath){
    try{
        const stats = await stat(filePath);

        if(stats.isFile()){
            const stat = await stat(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
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
