const ipAddress = require('./utils/ipAddress')
const locationKey = require('./utils/locationKey');
const forecast = require('./utils/forecast');
const news = require('./utils/news');

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app =express()

// setup path for express
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlerbars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hammad Hanif'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.city)
    {
        let inputCity = req.query.city

        if(!inputCity)
        {
            ipAddress((error, { city }) => {
                if(error)
                {
                    return res.send({ error })
                }
                locationKey(city,(error, { Key, Country, Region } = {}) => {
                    if(error)
                    {
                       return res.send({ error })
                    }
                    forecast(Key,(error, { temperature } = {}) => {
                        if(error)
                        {
                            return res.send({ error })
                        }
                        news(Country, (error, { data }) => {
                            if(error)
                            {
                                return res.send({ error })
                            }
                                res.send({
                                    Country,
                                    Region,
                                    temperature,
                                    data: [... data]
                                })
                        })
                    })
                
                })
            })
        }
    }
    else
    {
        locationKey(req.query.city,(error, { Key, Country, Region } = {}) => {
            if(error)
            {
                return res.send({ error })
            }
            forecast(Key,(error, { temperature } = {}) => {
                if(error)
                {
                    return res.send({ error })
                }
                news(Country, (error, { data }) => {
                    if(error)
                    {
                        return res.send({ error })
                    }
                    res.send({
                        Country,
                        Region,
                        temperature,
                        data: [... data]
                    })
                })
            })
        
        })
    }
})

app.listen('3000', () => {
    console.log('Server Running');
})

