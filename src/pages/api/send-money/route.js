
import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: "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"
});
export default async function handler(req, res) {
    const message = req.body.text;
    console.log(message)
    let json = await getGroqChatCompletion(message)
    json = json.choices[0].message.content
    res.status(200).json({ json });

}

async function getGroqChatCompletion(message) {
    let combined = `${message}. from this message identify who this is transacting to and the amount. Return ONLY a json of these. don't turn ENS into an address; do not return any other text`
    let assistant = "do not say more than just the json "
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: combined,
            }
        ],
        model: "llama3-8b-8192",
    });
}
