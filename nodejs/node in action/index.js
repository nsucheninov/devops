var fs = require('fs');

var stream = fs.createReadStream('./index.js')
stream.on('data', (chunk)=> {
    console.log(chunk)
})

stream.on('end', function () {
    console.log('finished')
})