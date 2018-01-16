'use strict'
require('dotenv').config()
const twit = require('twit')
const ora = require('ora')

let bot = new twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})
//, { track: 'github.com/' }
const stream = bot.stream('statuses/filter', { track: 'github.com/' })
const spinner = ora('Waiting for tweets ...')

stream.on('connected',  (response) => {
    spinner.start()
})

stream.on('tweet',  (tweet) => {
    spinner.stop()
    console.log(tweet)
    bot.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
        console.log(data)
    })
    spinner.start()
})