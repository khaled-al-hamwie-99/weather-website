const express = require('express');
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('node:path')
const app = express();
const port = process.env.PORT || 3000;
const date = new Date();
// define path for express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handelbars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "khaled"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "khaled"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "you need help",
        name: "khaled"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no address provided'
        })
    }
    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error)
            return res.send({ error })
        forcast(lat, lon, (error, respone) => {
            if (error)
                return res.send({ error })
            res.send({
                location,
                weather: respone.current.condition.text
            })
        })
    })
    // res.send({ address: req.query.address, forcast: "snow", location: "new york" })

})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "please enter a search"
        })
    }
    res.send({
        product: [req.query.search]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 not found",
        errorMassege: "help artical not found",
        name: "khaled"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page not found",
        errorMassege: "sorry we couldn't found your page",
        name: "khaled"
    })
})
app.listen(port, () => {
    console.log(`example app listening on port ${port} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
})


