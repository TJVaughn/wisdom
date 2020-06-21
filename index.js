const express = require('express')
const port = process.env.PORT
const path = require('path')

const app = require('./server/src/app')
app.use(express.json())

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