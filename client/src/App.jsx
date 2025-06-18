import { useState, useEffect } from "react";

const App = () => {
  const [keyExists, setKeyExists] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["claudeApiKey"], (result) => {
      if (result.claudeApiKey) {
        setKeyExists(true);
      }
    });
  }, []);

  const handleReset = () => {
    chrome.storage.local.remove("claudeApiKey", () => {
      console.log("API Key removed");
      setKeyExists(false);
    });
  };

  if (!keyExists)
    return (
      <>
        <p>No Key</p>
      </>
    );

  return (
    <div
      style={{
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={handleReset}
        style={{
          backgroundColor: "#e53935",
          color: "white",
          padding: "10px 20px",
          fontSize: "14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c62828")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#e53935")}
      >
        Reset Claude Key
      </button>
    </div>
  );
};

export default App;
