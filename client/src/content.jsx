import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ChatWithOpenAI from "./Content/cont";

//
const root = document.createElement("div");
root.id = "leetcode_whisper";
root.style.position = "fixed";
root.style.top = "10px";
root.style.right = "10px";
root.style.zIndex = "9999";
root.style.background = "black";
root.style.border = "1px solid #ccc";
root.style.padding = "10px";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ChatWithOpenAI />
  </StrictMode>
);
