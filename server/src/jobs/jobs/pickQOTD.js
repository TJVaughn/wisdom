const Quote = require('../../models/Quote')
const sendDailyQuote = require('../../email/sendDailyQuote')

const shuffle = (array) => {
    for(let i = array.length - 1; i > 0; i--){

        let x = Math.floor(Math.random() * (i + 1))

        let t = array[i]
        array[i] = array[x] 
        array[x] = t
    }
    // return array
}


module.exports = (agenda) => {
    agenda.define('pickQOTD', {priority: 20}, async (job, done) => {
        const currQOTD = await Quote.findOne({qotd: true})
        currQOTD.qotd = false;
        await currQOTD.save()
        let quotes = await Quote.find({qotd: false})
        shuffle(quotes)
        // console.log(shuffledQuotes)
        let randNum = Math.floor(Math.random() * (quotes.length + 1))
        console.log(randNum)
        let newQOTD = quotes[randNum]
        newQOTD.qotd = true
        await newQOTD.save()
        await sendDailyQuote(newQOTD)
        job.repeatEvery('0 6 * * *', {
            timezone: 'America/New_York'
        })
        // job.repeatEvery('10 seconds')
        await job.save()
        // await job.remove()

        
        done()
    })
    // agenda.every('day ', 'pickQOTD')
}
