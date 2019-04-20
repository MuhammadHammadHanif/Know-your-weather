const request = require('request');

const locationKey = (city, callback) => {
    const key = 'cdk26jST1NP0MrdXRgJNDAKgJqOCwaES'
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey='+key+'&q='+city+'&offset=1'
    request({url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to AccuWeather Location service!.', undefined);
        }
        else if(body.length===0)
        {
            callback('Unable to find location!.', undefined);
        }
        else
        {
            callback(undefined, {
                Key: body[0].Key,
                Country: body[0].Country.LocalizedName,
                Region: body[0].AdministrativeArea.LocalizedName,
                countryID: body[0].Country.ID
            })

        }
    })
}

module.exports = locationKey;