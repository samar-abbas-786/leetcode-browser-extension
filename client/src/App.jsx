import React, { useEffect, useState } from "react";

const App = () => {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("openai_api_key");
    if (!savedKey) {
      const userKey = prompt("Please enter your OpenAI API key:");
      if (userKey) {
        localStorage.setItem("openai_api_key", userKey);
        setApiKey(userKey);
      }
    } else {
      setApiKey(savedKey);
    }
  }, []);

  return (
    <div>{apiKey ? <p>API Key is set!</p> : <p>Waiting for API key...</p>}</div>
  );
};

export default App;
