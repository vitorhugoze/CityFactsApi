const { Configuration, OpenAIApi } = require('openai')
var express = require('express')
var router = express.Router()
require('dotenv').config()

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  if(req.query.city != undefined){

    const config = new Configuration({
      apiKey: process.env.API_KEY
    })

    const api = new OpenAIApi(config)

    var response = await api.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Is ' + req.query.city + ' a city ? Respond with yes or no',
      max_tokens: 10
    })

    if(response.data.choices[0].text.toLowerCase().includes('yes')){

      response = await api.createCompletion({
        model: 'text-davinci-003',
        prompt: 'Say something about the city ' + req.query.city,
        max_tokens: 120
      })

      res.json({
        answer: response.data.choices[0].text
      })

    } else {

      res.json({
        answer: 'Invalid city, fell free to try another one'
      })

    }

  } else {

    res.json({
      answer: 'Api CityFacts use ?city= format to get a response'
    })

  }

});

module.exports = router;
