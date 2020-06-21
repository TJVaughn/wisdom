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
    let url = ''
    if(process.env.PRODUCTION){
        url = 'https://ancientwisdom.io'
    } else {
        url = 'http://localhost:3000'
    }
    const msg = {
        to: email,
        from: 'quote@ancientwisdom.io',
        subject: 'Your Daily Quote',
        html: `
        <h3>
            "${quote.message}"
        </h3>
        <h5>
            --${quote.source}
        </h5>
        <hr />
        <p>
                <a href="https://paypal.me/VaughnWebdevelopment?locale.x=en_US">Buy me a coffee</a>
            </p>
            <hr />
        <p>
            We'd hate to see you go, but if you wish to <a href="${url}/email/unsubscribe?email=${email}" >unsubscribe</a>, we understand.
        </p>
        `,
      };
      sgMail.send(msg);
}

module.exports = sendDailyQuote