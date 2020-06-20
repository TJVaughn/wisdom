const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendVerificationEmail = async (email, code) => {
    let url = ''
    if(process.env.PRODUCTION){
        url = 'https://ancientwisdom.io'
    } else {
        url = 'http://localhost:3000'
    }
    const msg = {
        to: email,
        from: 'hauck.trevor@gmail.com',
        subject: 'Verify your email!',
        html: `
        <h1>Thank you for signing up!</h1>
        <h3>
            Please <a href="${url}/email/verify/?id=${code}&email=${email}">verify your email here.</a>
        </h3>
        <hr />
        <p>
        If you believe this to be an error and wish to unsubscribe, <a href="${url}/email/unsubscribe?email=${email}" >click here</a>
        </p>
        `,
      };
      sgMail.send(msg);
}

module.exports = sendVerificationEmail