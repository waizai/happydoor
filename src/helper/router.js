/*
* @Author: dangxiaoli
* @Date:   2017-12-27 20:51:09
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-30 23:45:12
*/
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const path = require('path');
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');
const config = require('../config/defaultConfig.js');
const compress = require('./compress.js');
const range = require('./range.js');
const isFresh = require('./cache.js');

//__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath,'utf-8');
const template = Handlebars.compile(source);
const mime = require('./mime.js')


module.exports = async function(req, res, filePath){
    try{
        //stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。
        //我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。
        const stats = await stat(filePath);
        if(stats.isFile()){
            const contextType = mime(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', contextType);

            if(isFresh(stats, req, res)){
                res.statusCode = 304;
                res.end();
                return
            }

            // 返回一个新建的 ReadStream 对象
            // 流（stream）形式，所以必须通过pipe管道命令中介，传给res
            let rs;
            const {code, start, end} = range(stats.size, req, res);
            if(code === 200){
                rs = fs.createReadStream(filePath);
            } else {
                rs = fs.createReadStream(filePath,{start, end});
            }

            if(filePath.match(config.compress)){
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        }else if(stats.isDirectory()){
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            //path.basename() 方法返回一个 path 的最后一部分
            //path.relative方法接受两个参数，这两个参数都应该是绝对路径。该方法返回第二个路径相对于第一个路径的那个相对路径。
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                }),
                dir: dir ? `/${dir}` : '',
            }
            res.end(template(data))
        }
    }catch(ex){
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or a file`);
    }
}
