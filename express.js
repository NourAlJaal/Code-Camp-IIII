//STEP 5

const fs = require('fs');
const express = require('express');
const expressApp = express();

expressApp.set('views', __dirname + '/views');
expressApp.set('view engine', 'ejs');

expressApp.get('/home', function(request, response) {
    const rawData = fs.readFileSync('processedPaintings.json', 'utf8'); //read file
    const painting = JSON.parse(rawData)
    response.render('index',{
        data: painting
    })

});

expressApp.listen(8080, function() {
    console.log('server works!')
});