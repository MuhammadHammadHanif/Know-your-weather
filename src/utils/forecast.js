const request = require('request');

fToC = (fahrenheit)  =>
{
  const fToCel = Math.round((fahrenheit - 32) * 5 / 9);
  const message = `${fToCel}\xB0C.`;
  return message
} 

const forecast = (cityKey, callback) => {
    const key = 'cdk26jST1NP0MrdXRgJNDAKgJqOCwaES'
    const url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/'+cityKey+'?apikey='+key

    request({ url, json: true }, (error, { body }) => {
        if(error)
        {
            callback('Unable to connect to AccuWeather Forecast service!.', undefined);
        }
        else if(body.Message)
        {
            callback('Unable to find location!.', undefined);
        }
        else
        {
            callback(undefined, {
                temperature: fToC(body[0].Temperature.Value)
            })
        }
    })
}

module.exports = forecast;