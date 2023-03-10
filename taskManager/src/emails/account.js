const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hastisutaria25@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hastisutaria25@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}