import { useState, useEffect } from "react";

const App = () => {
  const [key, setKey] = useState("");

  // Run only once after mount
  useEffect(() => {
    chrome.storage.local.get(["claudeApiKey"], (result) => {
      if (result.claudeApiKey) {
        setKey(result.claudeApiKey);
      }
    });
  }, []);

  const handleReset = () => {
    if (!key) {
      const saveKey = prompt("Enter the Claude API Key:");
      if (saveKey) {
        chrome.storage.local.set({ claudeApiKey: saveKey }, () => {
          console.log("API Key saved to storage");
        });
        setKey(saveKey);
        window.location.reload();
      }
    } else {
      chrome.storage.local.remove("claudeApiKey", () => {
        console.log("API Key removed");
      });
      setKey("");
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#2a5298" }}>
          Claude API Key Manager
        </h2>

        <button
          onClick={handleReset}
          style={{
            backgroundColor: key ? "#e53935" : "#43a047",
            color: "white",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = key ? "#c62828" : "#2e7d32")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = key ? "#e53935" : "#43a047")
          }
        >
          {key ? "Reset Claude Key" : "Add Claude Key"}
        </button>
      </div>
    </div>
  );
};

export default App;
