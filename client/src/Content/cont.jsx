import React, { useState, useEffect } from "react";
import axios from "axios";

// Chat Box Component
const ChatWithClaude = ({ apiKey }) => {
  const [prompt, setPrompt] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState();

  useEffect(() => {
    const getCodeSnippet = document.querySelectorAll(".view-line");
    let s = "";
    getCodeSnippet.forEach((viewcode) => {
      s += viewcode.innerText + "\n";
    });
    setCode(s);
    console.log("Extracted Code:\n", s);
  }, []);

  console.log("code", code);

  const handleAsk = async () => {
    if (!prompt.trim()) return alert("Enter a prompt first.");
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await axios.post("http://localhost:3001/api/ask-claude", {
        prompt,
        problemStatement,
        code,
        // apiKey,
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
        💬 LeetCode Assistant
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask about your code, approach, or get a hint…"
        rows={4}
        className="w-full h-24 resize-none overflow-hidden p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 mb-3"
      />

      <button
        onClick={handleAsk}
        className="w-full  py-2 font-medium text-white bg-blue-600 shadow-sm shadow-black rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "Ask Assistant"}
      </button>

      {response && (
        <div className="bg-gray-900 text-green-100 mt-4 p-3 rounded-lg font-mono whitespace-pre-wrap max-h-none overflow-y-auto border border-green-400">
          {response}
        </div>
      )}
    </div>
  );
};

// Floating Button + Logic
const FloatingChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleClick = () => {
    // if (!apiKey) {
    //   const saveKey = prompt("Enter your Claude API Key:");

    //   if (saveKey) {
    //     chrome.storage.local.set({ claudeApiKey: saveKey }, () => {
    //       console.log("API Key saved to storage");
    //     });

    //     setApiKey(saveKey);
    setShowChat(true);
  };
  // } else {
  //   setShowChat(true);
  // }
  // };

  // useEffect(() => {
  //   // Initial load
  //   chrome.storage.local.get(["claudeApiKey"], (result) => {
  //     if (result.claudeApiKey) {
  //       setApiKey(result.claudeApiKey);
  //     }
  //   });

  // Watch for changes made from App.jsx or elsewhere
  // const handleStorageChange = (changes, area) => {
  //   if (area === "local" && changes.claudeApiKey) {
  //     const newValue = changes.claudeApiKey.newValue || "";
  //     setApiKey(newValue);

  //     if (!newValue) {
  //       setShowChat(false); // Also hide chat if key was removed
  //     }
  //   }
  // };

  //   chrome.storage.onChanged.addListener(handleStorageChange);

  //   return () => {
  //     chrome.storage.onChanged.removeListener(handleStorageChange);
  //   };
  // }, []);

  return (
    <>
      {!showChat && (
        <button
          onClick={handleClick}
          className="fixed h-max w-[60vw] bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-gray-800 transition"
        >
          💬 Samar.AI
        </button>
      )}

      {showChat && <ChatWithClaude apiKey={apiKey} />}
    </>
  );
};

export default FloatingChatButton;
