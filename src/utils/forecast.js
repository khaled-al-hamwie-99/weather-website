const request = require('request')

// const url = 'https://api.weatherapi.com/v1/forecast.json?key=561e232def204f03ae3205818220906&q=Paris&days=1&aqi=no&alerts=no'
// request({ url: url, json: true }, (error, respone) => {
//     if (error)
//         console.log(`enable to connect to the ${error.hostname}`)
//     else if (respone.body.error) {
//         console.log(respone.body.error.message)
//     }
//     else {
//         const data = respone.body
//         console.log(`the weather condition is ${data.current.condition.text} it is currently ${data.forecast.forecastday[0].hour[0].temp_c} degree,in ${data.location.name},${data.location.country} there will be ${data.forecast.forecastday[0].hour[0].chance_of_rain} chance of rain`)
//     }
// })

const forecast = (lat, lon, callback) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=561e232def204f03ae3205818220906&q=${lat},${lon}&days=1`
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback(`enable to connect to the ${error.hostname}`, undefined)
        else if (body.error)
            callback(body.error.message, undefined)
        else
            callback(undefined, body)
    })
}

module.exports = forecast;