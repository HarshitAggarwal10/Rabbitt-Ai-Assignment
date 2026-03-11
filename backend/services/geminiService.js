const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateSalesSummary(data) {

  const prompt = `
Analyze the following sales dataset and generate a concise executive summary.

Sales Data:
${JSON.stringify(data)}

Include:
- top performing region
- category trends
- anomalies
- recommendations
`;

  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5
    });

    return completion.choices[0].message.content;

  } catch (error) {

    console.error("Groq API error:", error);
    throw new Error("AI summary generation failed");

  }
}

module.exports = { generateSalesSummary };