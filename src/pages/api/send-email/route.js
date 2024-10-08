const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });


export default async function handler(req, res) {
    // mg.messages.create('sandbox-123.mailgun.org', {
    //     from: "Excited User <mailgun@sandbox604a18b89e6544deb4fe274dfe1910e2.mailgun.org>",
    //     to: ["sanjay.amirthraj@gmail.com"],
    //     subject: "Hello",
    //     text: "Testing some Mailgun awesomeness!",
    //     html: "<h1>Testing some Mailgun awesomeness!</h1>"
    // })
    //     .then((msg) => console.log(msg)) // logs response data
    //     .catch((err) => console.log(err)); // logs any error

    return res.status(200)
}