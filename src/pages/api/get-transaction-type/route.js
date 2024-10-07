import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
    const message = req.body.text;
    console.log(message)
    let which = 1
    if (message.includes("send")) {
        which = 1;
    } else if (message.includes("swap")) {
        which = 2; // Return 2 if the message contains "swap"
    } else {
        which = 0; // Return 0 for any other case
    }
    if (which !== null) {
        res.status(200).json({ which });
    } else {
        res.status(200).json({ error: "Failed to get a valid response " });
    }
}

// New function to call OpenAI API
async function callOpenAi(message) {
    if (message.includes("send")) {
        return 1; // Return 1 if the message contains "send"
    } else if (message.includes("swap")) {
        return 2; // Return 2 if the message contains "swap"
    } else {
        return 0; // Return 0 for any other case
    }
}