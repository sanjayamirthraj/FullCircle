// pages/api/send_money/route.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;
  console.log("Received message:", message);

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const transactionDetails = await parseTransaction(message);
    res.status(200).json(transactionDetails);
  } catch (error) {
    console.error("Error parsing transaction:", error);
    res
      .status(500)
      .json({ error: "Failed to parse the transaction message", details: error.message });
  }
}

async function parseTransaction(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an assistant that extracts transaction details from messages.
Provide the output in JSON format with the following fields:
- "recipient": (the recipient)
- "amount": (numeric value)
If any field is missing or cannot be determined, use null for that field.
Do not include any additional text or explanation, only output valid JSON.`,
      },
      { role: "user", content: `Extract the transaction details from this message: "${message}"` },
    ],
    max_tokens: 150,
    temperature: 0,
  });

  const assistantOutput = response.choices[0].message.content.trim();
  console.log("Assistant output:", assistantOutput);

  // Parse the JSON output from the assistant
  try {
    const transactionDetails = JSON.parse(assistantOutput);
    return transactionDetails;
  } catch (error) {
    throw new Error("Failed to parse JSON output from assistant");
  }
}
