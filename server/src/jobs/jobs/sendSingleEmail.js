const sendSingleEmail = require('../../email/sendSingleEmail')

module.exports = (agenda) => {
    agenda.define('sendSingleEmail', {priority: 20}, async (job, done) => {
        try {
            let currQOTD = await Quote.findOne({qotd: true})

            let quotes = await Quote.find({qotd: false})
            quotes = filterRecentQuotes(quotes)
            currQOTD.qotd = false;
            await currQOTD.save()
            shuffle(quotes)
            let randNum = Math.floor(Math.random() * (quotes.length))
            let newQOTD = quotes[randNum]
            newQOTD.qotd = true
            newQOTD.lastDateWasQotd = Date.now()
            // console.log(new Date(newQOTD.lastDateWasQotd - 2592000 * 1000))
            await newQOTD.save()
            await sendDailyQuote(newQOTD)
            const tweet = `
                "${newQOTD.message}" -- ${newQOTD.source}.
from ${newQOTD.type}.
Visit AncientWisdom.io to get the daily quote in your inbox!
#quote #wisdom`
            postTweet(tweet)
            if(job.attrs.data){
                if(job.attrs.data.oneOff){
                    await job.remove()
                }
            }
            done()
        } catch (error) {
            throw new Error("Error in pick qotd: " + error)
        }
        
    })
    // agenda.every('5 seconds', 'pickQOTD')

}