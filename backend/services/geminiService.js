const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateSalesSummary(data) {

  const prompt = `
Analyze the following sales dataset and generate a concise executive summary.

Sales Data:
${JSON.stringify(data)}

Provide insights such as:
- top performing region
- category performance
- anomalies
- strategic recommendations
`;

  try {

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-8b-8192"
    });

    return completion.choices[0].message.content;

  } catch (error) {

    console.error("Groq API error:", error);
    throw new Error("AI summary generation failed");

  }
}

module.exports = { generateSalesSummary };