const fs = require('node:fs/promises');

fs.readFile('./.env', 'utf8').then((data) => {
    console.log(data);
    process.env = data;
});






console.log(process.env);