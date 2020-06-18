require('./db/mongoose')
const express = require('express');
const app = express();

const quoteRouter = require('./routers/quote')

app.use(express.json())

app.use(quoteRouter)

module.exports = app