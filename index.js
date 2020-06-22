const express = require('express')
const port = process.env.PORT
const path = require('path')

const agenda = require('./server/src/jobs/agenda')

const app = require('./server/src/app')
app.use(express.json())

const startAgenda = async () => {
    await agenda.start()
    // await agenda.every('1:45pm', 'pickQOTD')
    // await agenda.schedule('1 second', 'pickQOTD')
    await agenda.every('1440 minutes', 'pickQOTD')
}

startAgenda()

const forceSSL = (req, res, next) => {
    if(process.env.NODE_ENV === 'production'){
        console.log(req.headers)
        if(req.header('x-forwarded-proto') === 'http') {
            return res.redirect(301, `https://ancientwisdom.io/`)
        }
        if(req.header('host') === 'www.ancientwisdom.io'){
            return res.redirect(301, 'https://ancientwisdom.io/')
        }
    }
    return next();
}

app.use(forceSSL)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.listen(port, () => {
    console.log("Server is listening on port: " + port)
})  

//from d/programs
//mongodb/bin/mongod.exe --dbpath=mongodb-data