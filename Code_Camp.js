//STEP 1

const fs = require('fs');
const Papa = require('papaparse');
const rawData = fs.readFileSync('all_data_info.csv', 'utf-8');
const parsedData = Papa.parse(rawData).data;

//STEP 2

//filter out the images that don't match in the image folder (keep path-names from 0-10000.jpg)
let filtered = parsedData.filter(function (item) {
    if (item[11] !== undefined && item[11].match(/^\d{0,4}\.|^10000\./g)) { //|^\d{3}\.|^\d{2}\.|^[0-9]\./g)) {
        return item
    }
});

//splitting the data to process it
let firstPaintings = filtered.slice(0, 3000);
let secondPaintings = filtered.slice(3000, 6000);
let thirdPaintings = filtered.slice(6000, 10000);

let allPaintings = [];
thirdPaintings.forEach(function(item)  {
        item[1] = item[1].replace(".0","")
        item[1] = item[1].replace("c.","")
        if (item !== undefined && item[1].match(/^\d{4}$/g)) {
            allPaintings.push({
                artist: item[0],
                year: item[1],
                genre: item[7],
                path: item[11]
            })
        }
});

//STEP 3

const ColorThief = require('./colorthief.js');
const convert = require('color-convert');

allPaintings.forEach(function(painting) {
    ColorThief.getColor("art_dataset_10k\\" + "art_dataset_10k\\" + "images\\" + painting.path, 1000)
        .then(color => {
            let hsl = convert.rgb.hsl(color);
            painting.dominantColor = `hsl(${hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%"})`
            painting.hue = hsl[0]
            fs.appendFileSync("processedPaintings.json", JSON.stringify(painting) + "," + "\n")
        })
        .catch(err => {
            console.log(err)
        })
});

/*STEP 6
The use of earth tones (brown, red, green etc.) remain the most dominant throughout the years.
In the later years, between 1850-2000, although earth tones are still dominant, we still see a wider
range of different color hues used, including more blue and grey for instance.
 */


















































