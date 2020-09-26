const request = require('request')

const geocode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFzbWluZWZ0ZWtoYXJpIiwiYSI6ImNrZjRvcjV0azBmMW8zMW9ma3Q2NzRtczEifQ.i_j8h3hXuPxW45VgF668rw&limit=1`

    request({url , json:true} , (error , response) => {
        if(error) {
            callback('unable connect to server connection!' , undefined)
        } else if(response.body.features == 0) {
            callback('unable to fine location!' , undefined)
        } else {
            callback(undefined , {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                place_name : response.body.features[0].place_name
            })
        }    
    })
}


module.exports = geocode