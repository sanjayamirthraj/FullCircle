
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: "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"
});


export default async function handler(req, res) {
    const message = req.body;

    let json = await callOpenAi(message)
    console.log(json)
    res.status(200).json({ json });

}

async function callOpenAi(message) {
    let newmessage = "send .001 eth to 0xc3Eb0D37362f6F51fC4A741659CC3B83EC96cb9C"
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `${newmessage}. from this message identify who this is transacting to and the amount as a number without any other text. 
                Return ONLY a json of these. don't turn ENS into an address; do not return any other text`
            },
            { role: "user", content: `Classify this transaction: "${message}"` }
        ],
    });

    const assistantOutput = response.choices[0].message.content;
    console.log(assistantOutput)
    return assistantOutput
}