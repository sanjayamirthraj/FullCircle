import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const openAiResponse = await callOpenAi(message);
        return NextResponse.json(openAiResponse);


    } catch (error) {
        console.error('Error sending transaction (API):', error);
        return NextResponse.json({ error: 'Something went wrong while checking for transaction (API).' }, { status: 500 });
    }
}

// New function to call OpenAI API
async function callOpenAi(message) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a financial assistant that can parse text and return JSON of the wallet address a user wants to send tokens to and the value of how much in tokens the user wants to send." },
            {
                role: "user",
                content: `Return a JSON object with the user's wallet address and the amount based on the message: ${message}`,
            },
        ],
    });
    const message = JSON.stringify(completion[0].message)
    console.log(message)
}