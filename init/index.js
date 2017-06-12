const fs = require('fs');
const path = require('path');

let init = (config) => {
    const initPath = __dirname;
    let init = fs.readdirSync(initPath);
    init.forEach(function (js) {
        if (js === 'index.js') {
            return;
        }

        require(path.join(initPath, js)).init(config, true);
    });
};

module.exports = init;
