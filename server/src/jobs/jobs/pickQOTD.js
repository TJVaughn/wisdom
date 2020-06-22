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
        try {
            console.log("hello")
            let currQOTD = await Quote.findOne({qotd: true})

            let quotes = await Quote.find({qotd: false})
            currQOTD.qotd = false;
            await currQOTD.save()
            console.log(currQOTD)

            shuffle(quotes)
            // console.log(shuffledQuotes)
            let randNum = Math.floor(Math.random() * (quotes.length))
            console.log(randNum)
            let newQOTD = quotes[randNum]
            newQOTD.qotd = true
            await newQOTD.save()
            // await sendDailyQuote(newQOTD)
            
            // job.repeatEvery('0 6 * * *', {
            //     timezone: 'America/New_York'
            // })
            // job.repeatEvery('10 seconds')
            // await job.save()
            // await job.remove()
            done()
        } catch (error) {
            throw new Error("Error in pick qotd: " + error)
        }
        
    })
    // agenda.every('5 seconds', 'pickQOTD')

}
