/*
* @Author: dangxiaoli
* @Date:   2017-12-30 20:45:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-30 22:59:59
*/


module.exports = (totalSize, req, res) => {
    const range = req.headers['range'];
    if(!range){
        return {code: 200}
    }

    const sizes = range.match(/bytes=(\d*)-(\d*)/);
    const end = sizes[2] || totalSize - 1;
    const start = sizes[1] || totalSize - end;

    if(start > end || start < 0 || end > totalSize){
        return {code: 200}
    }
    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Content-Ranges',`bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Accept-length',end - start);

    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}
