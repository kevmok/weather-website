const request = require('postman-request')
require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+ process.env.WEATHER_TOKEN +'&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!')
        } else {
            callback(undefined,
                'Today is a ' + body.current.weather_descriptions[0]
                + ". It is currently " + body.current.temperature
                + " degrees out. It feels like " + body.current.feelslike + " degrees out.\n"
                + "Also experiencing wind speeds of " + body.current.wind_speed + ' mph.')
        }
    })
}

module.exports = forecast