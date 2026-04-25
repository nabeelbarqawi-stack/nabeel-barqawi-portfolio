"use client";

import { useEffect } from "react";

// CSS variable overrides — injected AFTER the n8n stylesheet so cascade order wins.
// Coral: oklch(0.60 0.22 32) ≈ #CF4F36  |  bg: #F2F1EE  |  dark: #0E0E12
const THEME_CSS = `
  :root {
    --chat--color-primary:           #CF4F36;
    --chat--color-primary-shade-50:  #C04830;
    --chat--color-primary-shade-100: #AE4029;
    --chat--color-secondary:         #CF4F36;
    --chat--color-white:             #FFFFFF;
    --chat--color-light:             #F8F7F5;
    --chat--color-light-shade-50:    #F2F1EE;
    --chat--color-light-shade-100:   #E2E1DE;
    --chat--color-medium:            #9C9CAC;
    --chat--color-dark:              #0E0E12;
    --chat--color-disabled:          #9C9CAC;
    --chat--color-typing:            #68687A;
    --chat--border-radius:           16px;
    --chat--window--width:           400px;
    --chat--window--height:          620px;
  }

  /* Toggle button */
  .n8n-chat .chat-toggle {
    box-shadow: 0 8px 32px -8px rgba(207, 79, 54, 0.45);
  }

  /* Window chrome */
  .n8n-chat .chat-window {
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 24px 64px -12px rgba(0,0,0,0.18);
    border-radius: 20px;
    overflow: hidden;
    font-family: -apple-system, 'Inter', BlinkMacSystemFont, sans-serif;
  }

  /* Header */
  .n8n-chat .chat-window .chat-header {
    background: #0E0E12;
    padding: 24px 24px 20px;
  }
  .n8n-chat .chat-window .chat-header h1 {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .n8n-chat .chat-window .chat-header p {
    font-size: 13px;
    opacity: 0.6;
    margin-top: 4px;
  }

  /* Messages area */
  .n8n-chat .chat-messages-list {
    background: #F2F1EE;
    padding: 16px;
    gap: 10px;
  }

  /* Bot messages */
  .n8n-chat .chat-message.chat-message-from-bot .chat-message-bubble {
    background: #FFFFFF;
    color: #0E0E12;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 14px 14px 14px 4px;
    font-size: 15px;
    line-height: 1.6;
    box-shadow: 0 2px 8px -2px rgba(0,0,0,0.06);
  }

  /* User messages */
  .n8n-chat .chat-message.chat-message-from-user .chat-message-bubble {
    background: #CF4F36;
    color: #FFFFFF;
    border-radius: 14px 14px 4px 14px;
    font-size: 15px;
    line-height: 1.6;
  }

  /* Input bar */
  .n8n-chat .chat-input {
    background: #FFFFFF;
    border-top: 1px solid rgba(0,0,0,0.07);
    padding: 12px 16px;
  }
  .n8n-chat .chat-input textarea {
    background: #F8F7F5;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 10px;
    font-size: 15px;
    color: #0E0E12;
    padding: 10px 14px;
  }
  .n8n-chat .chat-input textarea::placeholder {
    color: #9C9CAC;
  }
  .n8n-chat .chat-input textarea:focus {
    border-color: #CF4F36;
    outline: none;
  }
`;

export default function N8nChatWidget() {
  useEffect(() => {
    // 1. n8n base stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    // 2. Portfolio theme overrides — appended AFTER the link so cascade wins
    const style = document.createElement("style");
    style.textContent = THEME_CSS;
    document.head.appendChild(style);

    // 3. n8n chat module script
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://nabeelbarqawi.app.n8n.cloud/webhook/30d8122f-ef68-4c36-a690-f851e63b03b8/chat',
        mode: 'window',
        showWelcomeScreen: false,
        initialMessages: [
          "Hi, I'm Nabeel's AI assistant. Ask me anything about his work, experience, or how to collaborate."
        ],
        i18n: {
          en: {
            title: 'Nabeel Barqawi',
            subtitle: 'AI assistant — ask me anything.',
            footer: '',
            getStarted: 'Start a conversation',
            inputPlaceholder: 'Type your message…',
          }
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(style)) document.head.removeChild(style);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return null;
}
