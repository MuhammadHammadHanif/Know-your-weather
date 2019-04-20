const request = require('request')

const news = (country, callback) => {

    const key="1d3a7df535544e1d8736d68a41f0ec70"
    const url = 'https://newsapi.org/v2/everything?q='+country+'&apiKey='+key+'&pageSize=5'

    request({ url, json: true }, ( error, { body } ) => {
        if(error)
        {
            callback('Unable to connect to NewsAPI service!.', undefined);
        }
        else if(body.articles.length === 0)
        {
            callback('Unable to find location!.', undefined);
        }
        else
        {
            callback(undefined, {
                data: body.articles
            })
        }
    })
}

module.exports = news

