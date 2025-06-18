import React, { useEffect, useState } from "react";
import { useApiKey } from "../context/apiContext";

const App = () => {
  const { apiKey, setApiKey } = useApiKey();

  useEffect(() => {
    const userKey = prompt("Please enter your OpenAI API key:");
    if (userKey) {
      localStorage.setItem("openai_api_key", userKey);
      setApiKey(userKey);
    }
  }, []);

  return (
    <div className="p-4">
      {apiKey ? (
        <>
          <p>✅ API key is set!</p>
        </>
      ) : (
        <p>🔒 Waiting for API key...</p>
      )}
    </div>
  );
};

export default App;
