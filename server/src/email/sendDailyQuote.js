const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require('../models/User')

const sendDailyQuote = async (quote) => {
    const allUsers = await User.find({isVerified: true})
    for (let i = 0; i < allUsers.length; i ++){
        await sendEmail(allUsers[i].email, quote)
    }
}

const sendEmail = async (email, quote) => {
    let today = new Date()
    let coffee = ''
    // console.log(today.getDay())
    if(today.getDay() === 5){
        coffee = `<a target="_blank" rel="noopener noreferrer" href="https://paypal.me/VaughnWebdevelopment?locale.x=en_US">buy me a coffee (paypal)</a><p>
        ...
        </p>`
    }
    let url = ''
    if(process.env.NODE_ENV === 'production'){
        url = 'https://ancientwisdom.io'
    } else {
        url = 'http://localhost:3000'
    }
    const msg = {
        to: email,
        from: 'quote@ancientwisdom.io',
        subject: 'Your Daily Quote',
        html: `
        <h1>Your Quote: </h1>
        <h2>
            "${quote.message}"
        </h2>
        <h3>
            --${quote.source}
        </h3>
        <hr />
        <p>
            Interested in helping?
        </p>
        <p>
            <a href="${quote.charity.link}" >${quote.charity.name}</a>
        </p>
        <hr />

        <p>
        ...
        </p>
        ${coffee}
        
        <p>
            We'd hate to see you go, but if you wish to <a href="${url}/email/unsubscribe?email=${email}" >unsubscribe</a>, we understand.
        </p>
        `,
      };
      sgMail.send(msg);
}

module.exports = sendDailyQuote