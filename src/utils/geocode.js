const request = require('request')
const geoCode = (address, callback) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&appid=551e5963a17cadf992c2a2e5ea4d5970`
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback(`enable to connect to ${error.hostname}`, undefined);
        else if (body.length == 0)
            callback(`unable to find location,try another search`, undefined)
        else {
            const data = body[0]
            callback(undefined, {
                lat: data.lat,
                lon: data.lon,
                location: `${data.name} , ${data.state} , ${data.country}`
            })
        }
    })
}
module.exports = geoCode;