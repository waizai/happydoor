/*
* @Author: dangxiaoli
* @Date:   2017-12-29 14:14:13
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-29 14:37:16
*/

const path = require('path');

const mimeTypes = {
    'css': 'text/css',
    'html': 'text/html',
    'js': 'application/javascript',
    'txt': 'text/plain',
    'manifest': 'text/cache-manifest',
}


//path.extname() 方法返回 path 的扩展名,ex-返回: '.html' 没有则返回空串
module.exports = (filePath) => {
    let ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase();
    if(!ext){
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt'];
}
