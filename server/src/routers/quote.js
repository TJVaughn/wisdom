const express = require('express')
const Quote = require('../models/Quote')
const User = require('../models/User')
const mongoose = require('mongoose')
const sendVerificationEmail = require('../email/sendVerificationEmail')
const router = new express.Router()
const agenda = require('../jobs/agenda')

router.post('/api/start-stop-daily-email', async(req, res) => {
    //only one user, no need to add a whole thing for auth
    if(req.body.userName !== process.env.USERNAME || req.body.password !== process.env.PASSWORD){
        return res.send({error: "nah"})
    }
    if(req.body.daily === 'start'){
        await agenda.start()
        // await agenda.every('10 seconds', 'pickQOTD')
        await agenda.schedule('1 second', 'pickQOTD')
        return res.send({message: "starting..."})
    }
    if(req.body.daily === 'stop'){
        await agenda.stop()
        return res.send({message: 'stopping...'})
    }
})

//email signup
router.post('/api/signup', async (req, res) => {
    try {
        //is the email already in the database
        //if so, send error
        const user = new User({
            email: req.body.email,
            verificationCode: new mongoose.Types.ObjectId(),
            isVerified: false
        })
        let users = await User.find({})
        for (let i = 0; i < users.length; i++){
            if (user.email === users[i].email){
                return res.send({error: "Email already exists."})
            }
        }
        //send email with link
        //await sendVerificationEmail(user.email, user.verificationCode)
        await sendVerificationEmail(user.email, user.verificationCode)

        await user.save()
        return res.send({user})
        //otherwise send an email with a link
        //when that link is clicked it will simply take the user to a page that says successfully verified!
        //the link will hold the params of the users email, and a code generated when they signup initially, stored on the user model
        //if that page is visited, the email and code will be posted to /api/verify and if the verification is successful it will update the users data.

        // let user = await new 
    } catch (error) {
        return {error: "Error from signup: " + error}
    }
})
//verify email route
router.get('/api/email/verify-email', async(req, res) =>{
    try {

        const email = req.query.email
        const code = req.query.id
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(404).send({error: 'user not found'})
        }
        if(code !== user.verificationCode){
            return res.send({error: "Invalid code"})
        }
        user.isVerified = true
        await user.save()
        return res.send({success: "Successfully verified!"})
    } catch (error) {   
        return {error: "Error from verify email: " + error}
    }
})

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

//unsubscribe email
router.get('/api/email/unsubscribe-email', async (req, res) => {
    try {   
        const email = req.query.email
        const user = await User.findOne({email: email})
        if(!user) {
            return res.send({error: "No user found!"})
        }
        await user.remove()
        return res.send({success: `${email} has been unsubscribed.`})
    } catch (error) {
        return {error: "Error from unsubscribe: " + error}
    }
})

//------------------------------------------------------------------------------------------------
//remove a quote -- do this manually?
//update a quote -- do this manually?


module.exports = router