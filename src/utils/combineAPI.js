const locationKey = require('./locationKey');
const forecast = require('./forecast');
const news = require('./news');

const getAllData = (inputCity) => {
    locationKey(inputCity,(error, { Key, Country, Region } = {}) => {
        if(error)
        {
           return console.log(error)
        }
        forecast(Key,(error, { temperature }) => {
            if(error)
            {
                return console.log(error)
            }
            console.log('Country: '+Country)
            console.log('Region: '+Region)
            console.log('Temperature: '+temperature)
            news('pakistan', (error, { data }) => {
                if(error)
                {
                    return  console.log(error)
                }
                data.map(data => {
                    console.log('Source: '+data.source.name);
                    console.log('Title: '+data.title);
                })
            })
        })
    
    })
}

module.exports = getAllData