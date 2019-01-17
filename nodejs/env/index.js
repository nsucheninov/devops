if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const _ = require('lodash');
const process = require('process');

const path = require('path');
const storage = require('azure-storage');

dbhost = process.env.DB_HOST || "127.0.0.1";


const blobService = storage.createBlobService();

//env = process.env.NODE_ENV;

_.each(process.env, (value, key) => {
    console.log(`${key} = ${value}`);
});

console.log("db host: ", dbhost);

//console.log(`NODE-ENV ${env}`);   