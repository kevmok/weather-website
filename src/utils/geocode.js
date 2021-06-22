const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2V2bW9rIiwiYSI6ImNrcTQ2NWE0dzAwN3MzMXA2d3M1OTY4b2wifQ.GbhEGsVEUZ6Tkt3hKu4GMw'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location servers!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                Longitude: body.features[0].center[0],
                Latitude: body.features[0].center[1],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode