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
    return <p style={{ margin: "16px", fontSize: "14px" }}>No Key</p>;

  return (
    <div style={{ padding: "16px", textAlign: "center" }}>
      <button
        onClick={handleReset}
        style={{
          backgroundColor: "#e53935",
          color: "white",
          padding: "8px 16px",
          fontSize: "14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s",
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
