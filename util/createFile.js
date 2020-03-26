const path = require('path')
const fs = require('fs')

module.exports = {

    dirCreate:function (dir) {
       const screenDir = path.join(__dirname,`../${dir}`)
        if (!fs.existsSync(screenDir)) {
            fs.mkdirSync(screenDir);
        }
    }
}