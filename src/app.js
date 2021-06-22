const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // points directory of views to something else
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// set up route for hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kevin Mok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kevin Mok'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Get help bozo.',
        name: 'Kevin Mok'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(Latitude, Longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: Location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Kevin Mok'
    })
})

// * == match anything that has not been matched
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Kevin Mok'
    })
})

app.listen(3000, () => {
    console.log('Server brrrrrrrr on port :3000.')
})