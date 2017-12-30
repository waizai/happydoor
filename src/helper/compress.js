/*
* @Author: dangxiaoli
* @Date:   2017-12-29 16:14:42
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-30 16:20:22
*/
const {createGzip, createDeflate} = require('zlib');


module.exports = (rs, req, res) => {
    const  acceptEncoding = req.headers['accept-encoding'];
    //两种方式不压缩:浏览器不支持压缩方式,拿到的压缩方式没有服务器支持的方式
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    }else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip');
        return  rs.pipe(createGzip())
        //nodejs  stream需要深入了解
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate');
        return  rs.pipe(createDeflate())
    }
}
