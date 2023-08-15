const fs = require('node:fs');

fs.readFile('./.env', (err, data) => {
    console.log(data.toString());
});