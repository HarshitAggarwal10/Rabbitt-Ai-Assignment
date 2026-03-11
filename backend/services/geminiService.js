const axios = require("axios");

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
        },
        timeout: 30000
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.error("Gemini API error:", error.response?.data || error.message);

    // retry once if Gemini returns 503
    if (error.response && error.response.status === 503) {

      console.log("Retrying Gemini request...");

      const retry = await axios.post(
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
          },
          timeout: 30000
        }
      );

      return retry.data.candidates[0].content.parts[0].text;
    }

    throw new Error("AI summary generation failed");
  }
}

module.exports = { generateSalesSummary };