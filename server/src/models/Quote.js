const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    qotd: {
        type: Boolean
    },
    lastDate: {
        type: String
    }
}, {
    timestamps: true
})

const Quote = mongoose.model("Quote", quoteSchema)

module.exports = Quote