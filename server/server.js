import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" })); // open CORS (development only)
app.use(express.json());

app.post("/api/ask-claude", async (req, res) => {
  const { prompt, problemStatement, apiKey } = req.body;

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are a LeetCode expert who solves programming problems.  
Problem Statement: ${problemStatement}  
User Prompt: ${prompt}  

If the prompt is not related to a LeetCode problem, respond with:  
"Sorry, I can only help with LeetCode programming problems."
`,
          },
        ],
      },
      {
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.content[0].text });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Claude API request failed." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
