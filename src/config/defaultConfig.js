/*
* @Author: dangxiaoli
* @Date:   2017-12-25 20:09:49
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-30 23:31:23
*/
module.exports = {
    //cwd方法返回进程的当前目录（绝对路径）
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 9527,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}
