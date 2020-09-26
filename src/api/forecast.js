const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e6786453fd5eaa920f304cef48a6c761`

    request({url, json:true} , (error, response) => {
        if(error) {
            callback('Unable to connect to server connection!' , undefined)
        } else if(response.body.message) {
            callback('Unable to finde location!' , undefined)
        } else {
            callback(undefined , `${response.body.weather[0].description} It is currently weather .`)
        }
    })

}


module.exports = forecast