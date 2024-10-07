import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
    const message = req.body.text;
    console.log(message)
    let which
    if (message.includes("send")) {
        which = 1;
    } else if (message.includes("swap")) {
        which = 2;
    } else {
        which = 0;
    }
    if (which !== null) {
        res.status(200).json({ which });
    } else {
        res.status(200).json({ error: "Failed to get a valid response " });
    }
}

// New function to call OpenAI API
async function callOpenAi(message) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { "role": "user", "content": `check the  given message, ${message} for the presence of the words 'send' or 'swap'. The function should return 1 if the message contains 'send', return 2 if it contains 'swap', and return 0 if neither word is present.` }
        ]
    });
    return completion.choices[0].message
}