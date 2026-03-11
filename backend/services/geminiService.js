const axios = require("axios");

async function generateSalesSummary(data) {
  try {

    const prompt = `
You are a sales analyst.

Analyze the following sales dataset and generate a professional executive summary.
Highlight:
- top performing region
- product trends
- revenue insights
- any anomalies

Sales Data:
${JSON.stringify(data, null, 2)}
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    const summary =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated.";

    return summary;

  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw new Error("AI summary generation failed");
  }
}

module.exports = { generateSalesSummary };