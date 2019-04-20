const request = require('request')

const ipAddress = (callback) => {

    const key = '1e129a76edf24a9a8e5c6a95f040e636'
    const url = 'https://api.ipgeolocation.io/ipgeo?apiKey='+key

    request({ url, json: true }, ( error, { body }) => {
        if(error)
        {
            callback('Unable to connect to AccuWeather Location service!.', undefined);
        }
        else
        {
            callback(undefined, {
                city: body.city
            })
        }
    })
}

module.exports = ipAddress;