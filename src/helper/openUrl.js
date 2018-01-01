/*
* @Author: dangxiaoli
* @Date:   2018-01-01 20:14:05
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-01 20:16:01
*/
const {exec} = require('child_process');


module.exports = url => {
    switch(process.platform){
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;
    }
}
