const request = require('request')

const forecast = (latitude, longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=ec99e464d93184095d4b8f51ec0594ef&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json : true}, (error, {body})=> {
        if(error) {
            callback('Unable to connect to weather web service',undefined)
        } else if(body.error) {
            callback('Not a valid search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. The temperature is ' + body.current.temperature + ' degrees, feels like ' + body.current.feelslike + ' degrees and there is ' + body.current.precip + '% chance of rain'
                // condition : response.body.current.weather_descriptions[0],
                // temperature : response.body.current.temperature,
                // precip : response.body.current.precip,
                // feelslike : response.body.current.feelslike
            )
        }
    })
}

module.exports = forecast