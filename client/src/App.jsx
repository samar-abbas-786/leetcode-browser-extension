import { useState } from "react";

const App = () => {
  const [key, setKey] = useState("");
  chrome.storage.local.get(["claudeApiKey"], (result) => {
    if (result.claudeApiKey) {
      setKey(result.claudeApiKey);
    }
  });

  const handleReset = () => {
    if (!key) {
      const saveKey = prompt("Enter the Claude Api Key");
      if (saveKey) {
        chrome.storage.local.set({ claudeApiKey: saveKey }, () => {
          console.log("API Key saved to storage");
        });
        setKey(saveKey);
      }
    } else {
      chrome.storage.local.remove("claudeApiKey", () => {
        console.log("API Key removed");
      });
    }
  };

  return (
    <div>
      {
        <button
          onClick={handleReset}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            marginTop: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {key?"Reset Key":"Add Cluade key"}
        </button>
      }
    </div>
  );
};

export default App;
