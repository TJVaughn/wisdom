const express = require('express')
const Quote = require('../models/Quote')
const router = new express.Router()

//add a new quote with authorization
router.post('/api/quote/add', async (req, res) => {
    try {
        //only one user, no need to add a whole thing for auth
        if(req.body.userName !== process.env.USERNAME || req.body.password !== process.env.PASSWORD){
            return res.send({error: "nah"})
        }
        const quote = new Quote({
            message: req.body.message,
            source: req.body.source,
            qotd: false
        })
        await quote.save()
        return res.send({quote})
    } catch (error) {
        return {error: "Error from add quote: " + error}
    }
    
})
//read the current quote of the day
router.get('/api/quote', async (req, res) => {
    try {
        const [quote] = await Quote.find({qotd: true})
        return res.send({quote})
    } catch (error) {
        return {error: "Error from read quote: " + error}
    }
})


//------------------------------------------------------------------------------------------------
//remove a quote -- do this manually?
//update a quote -- do this manually?


module.exports = router