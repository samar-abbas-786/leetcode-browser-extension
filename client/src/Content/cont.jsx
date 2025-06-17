import React, { useState, useEffect } from "react";
import axios from "axios";

// Chat interface
const ChatWithClaude = () => {
  const [prompt, setPrompt] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const metaDescription = document.querySelector("meta[name=description]");
    if (metaDescription) {
      setProblemStatement(metaDescription.content);
      console.log("metaDescription.content", metaDescription.content);
    }
  }, []);

  const handleAsk = async () => {
    if (!prompt.trim()) return alert("Enter a prompt first.");
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await axios.post("http://localhost:3001/api/ask-claude", {
        prompt,
        problemStatement,
      });

      const reply = result.data?.reply || "No response.";
      setResponse(reply);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 429) {
        setResponse("⚠️ Too many requests. Please wait a bit.");
      } else {
        setResponse("❌ Something went wrong. Try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-[360px] bg-black border border-gray-200 shadow-lg rounded-xl p-4 z-50">
      <h2 className="text-xl font-semibold text-white mb-2">
        💬 LeetCode Chat Assistant
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask about your code, approach, or get a hint…"
        rows={4}
        className="w-full resize-none p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 mb-3"
      />

      <button
        onClick={handleAsk}
        className="w-full py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "🚀 Ask Claude"}
      </button>

      {response && (
        <div className="bg-gray-900 text-green-100 mt-4 p-3 rounded-lg font-mono whitespace-pre-wrap max-h-60 overflow-auto border border-green-400">
          {response}
        </div>
      )}
    </div>
  );
};

// Floating button + conditional chat render
const FloatingChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-gray-800 transition"
        >
          💬 Chat
        </button>
      )}

      {showChat && <ChatWithClaude />}
    </>
  );
};

export default FloatingChatButton;
