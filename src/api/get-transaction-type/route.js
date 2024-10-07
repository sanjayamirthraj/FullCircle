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
            { role: "system", content: "You are a financial assistant that can parse text and return a response based on the type of transaction." },
            {
                role: "user",
                content: `Based on the message: "${message}", return a single number. Only return a single number. If the message is looking to send a transaction to another wallet, return 1. If the message is looking to swap to another token, return 2. Else, return 0. Only return a single number it is very important you only return a single number.`,
            },
        ],
    });
    const result = JSON.stringify(completion[0].message);
    console.log(result);
    return result; // Ensure to return the result
}