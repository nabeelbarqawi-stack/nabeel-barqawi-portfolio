"use client";

import { useEffect } from "react";

// Injected after the n8n CDN stylesheet — same :root specificity, later in source order wins.
// Multiple selector variants cover different n8n chat package versions.
const THEME_CSS = `

/* =====================================================
   NABEEL AI — CHAT THEME
   #1C1A19 warm charcoal · #CF4F36 coral · #F2F1EE bg
===================================================== */

:root {
  --chat--color-primary:              #CF4F36;
  --chat--color-primary-shade-50:     #C04830;
  --chat--color-primary-shade-100:    #AE4029;
  --chat--color-secondary:            #CF4F36;
  --chat--color-white:                #FFFFFF;
  --chat--color-light:                #F8F7F5;
  --chat--color-light-shade-50:       #F2F1EE;
  --chat--color-light-shade-100:      #E2E1DE;
  --chat--color-medium:               #9C9CAC;
  --chat--color-dark:                 #1C1A19;
  --chat--color-disabled:             #9C9CAC;
  --chat--color-typing:               #68687A;
  --chat--border-radius:              14px;
  --chat--window--width:              400px;
  --chat--window--height:             640px;
}


/* ── Toggle Button ───────────────────────────────── */
.n8n-chat .chat-toggle,
#n8n-chat .chat-toggle {
  width: 52px !important;
  height: 52px !important;
  border-radius: 50% !important;
  background: #CF4F36 !important;
  border: none !important;
  box-shadow:
    0 4px 16px rgba(207,79,54,0.38),
    0 2px 6px rgba(0,0,0,0.10) !important;
  transition: transform 180ms ease, box-shadow 180ms ease !important;
}
.n8n-chat .chat-toggle:hover,
#n8n-chat .chat-toggle:hover {
  transform: scale(1.06) translateY(-1px) !important;
  box-shadow:
    0 8px 28px rgba(207,79,54,0.48),
    0 4px 10px rgba(0,0,0,0.12) !important;
}


/* ── Chat Window ─────────────────────────────────── */
.n8n-chat .chat-window,
#n8n-chat .chat-window {
  border-radius: 20px !important;
  border: 1px solid rgba(0,0,0,0.08) !important;
  box-shadow:
    0 32px 80px -16px rgba(0,0,0,0.18),
    0 8px 24px rgba(0,0,0,0.07) !important;
  overflow: hidden !important;
  font-family: -apple-system, 'Inter', BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  bottom: 76px !important;
}


/* ── Header ──────────────────────────────────────── */
.n8n-chat .chat-header,
.n8n-chat .chat-window header,
#n8n-chat .chat-header {
  background: #1C1A19 !important;
  padding: 20px 20px 18px !important;
  border-bottom: 1px solid rgba(255,255,255,0.06) !important;
  position: relative !important;
}

/* Online dot — top-right of header */
.n8n-chat .chat-header::after {
  content: '' !important;
  position: absolute !important;
  top: 20px !important;
  right: 48px !important;
  width: 7px !important;
  height: 7px !important;
  border-radius: 50% !important;
  background: #4ade80 !important;
  box-shadow: 0 0 0 2px rgba(74,222,128,0.28) !important;
}

/* Header title */
.n8n-chat .chat-header h1,
.n8n-chat .chat-header .chat-title,
.n8n-chat .chat-header [class*="title"],
#n8n-chat .chat-header h1 {
  font-size: 16px !important;
  font-weight: 600 !important;
  letter-spacing: -0.022em !important;
  color: #F5F3F0 !important;
  line-height: 1.25 !important;
  margin: 0 !important;
}

/* Header subtitle */
.n8n-chat .chat-header p,
.n8n-chat .chat-header .chat-subtitle,
.n8n-chat .chat-header [class*="subtitle"],
#n8n-chat .chat-header p {
  font-size: 12px !important;
  color: rgba(245,243,240,0.46) !important;
  margin: 4px 0 0 !important;
  letter-spacing: 0.01em !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
}

/* Header close/minimize button */
.n8n-chat .chat-header button,
.n8n-chat .chat-header .chat-close-button,
#n8n-chat .chat-header button {
  color: rgba(245,243,240,0.40) !important;
  background: transparent !important;
  border: none !important;
  transition: color 160ms ease !important;
}
.n8n-chat .chat-header button:hover,
#n8n-chat .chat-header button:hover {
  color: #F5F3F0 !important;
  background: transparent !important;
}


/* ── Messages List ───────────────────────────────── */
.n8n-chat .chat-messages-list,
.n8n-chat .messages-list,
.n8n-chat [class*="messages-list"],
#n8n-chat .chat-messages-list {
  background: #F2F1EE !important;
  padding: 20px 16px !important;
  gap: 10px !important;
  display: flex !important;
  flex-direction: column !important;
}

/* Thin scrollbar inside messages */
.n8n-chat .chat-messages-list::-webkit-scrollbar { width: 4px !important; }
.n8n-chat .chat-messages-list::-webkit-scrollbar-track { background: transparent !important; }
.n8n-chat .chat-messages-list::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.14) !important;
  border-radius: 4px !important;
}


/* ── Bot / Assistant Messages ────────────────────── */
.n8n-chat .chat-message-from-bot .chat-message-bubble,
.n8n-chat .chat-message--bot .chat-message-bubble,
.n8n-chat [class*="from-bot"] [class*="bubble"],
.n8n-chat [class*="message-bot"] [class*="bubble"],
.n8n-chat [class*="message--bot"] [class*="bubble"],
#n8n-chat .chat-message-from-bot .chat-message-bubble {
  background: #FFFFFF !important;
  color: #1C1A19 !important;
  border: 1px solid rgba(0,0,0,0.07) !important;
  border-radius: 4px 14px 14px 14px !important;
  padding: 14px 16px !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  box-shadow: 0 2px 8px -2px rgba(0,0,0,0.05) !important;
  max-width: 92% !important;
}


/* ── User Messages ───────────────────────────────── */
.n8n-chat .chat-message-from-user .chat-message-bubble,
.n8n-chat .chat-message--user .chat-message-bubble,
.n8n-chat [class*="from-user"] [class*="bubble"],
.n8n-chat [class*="message-user"] [class*="bubble"],
.n8n-chat [class*="message--user"] [class*="bubble"],
#n8n-chat .chat-message-from-user .chat-message-bubble {
  background: #CF4F36 !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 14px 4px 14px 14px !important;
  padding: 11px 15px !important;
  font-size: 14px !important;
  line-height: 1.62 !important;
  box-shadow: 0 2px 8px rgba(207,79,54,0.20) !important;
  max-width: 80% !important;
}


/* ── Typing Indicator ────────────────────────────── */
.n8n-chat [class*="typing"],
.n8n-chat .chat-message-typing {
  background: #FFFFFF !important;
  border: 1px solid rgba(0,0,0,0.07) !important;
  border-radius: 4px 14px 14px 14px !important;
  box-shadow: 0 2px 8px -2px rgba(0,0,0,0.05) !important;
}


/* ── Input Area ──────────────────────────────────── */
.n8n-chat .chat-input,
.n8n-chat .chat-input-wrapper,
.n8n-chat footer,
.n8n-chat [class*="chat-input"],
#n8n-chat .chat-input {
  background: #FFFFFF !important;
  border-top: 1px solid rgba(0,0,0,0.07) !important;
  padding: 12px 12px !important;
  gap: 8px !important;
  align-items: flex-end !important;
}

/* Textarea */
.n8n-chat textarea,
.n8n-chat .chat-input textarea,
#n8n-chat textarea {
  background: #F8F7F5 !important;
  border: 1.5px solid rgba(0,0,0,0.09) !important;
  border-radius: 12px !important;
  font-size: 14px !important;
  font-family: -apple-system, 'Inter', BlinkMacSystemFont, sans-serif !important;
  color: #1C1A19 !important;
  padding: 11px 14px !important;
  resize: none !important;
  line-height: 1.5 !important;
  min-height: 44px !important;
  transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease !important;
}
.n8n-chat textarea:focus,
.n8n-chat .chat-input textarea:focus,
#n8n-chat textarea:focus {
  border-color: #CF4F36 !important;
  box-shadow: 0 0 0 3px rgba(207,79,54,0.11) !important;
  outline: none !important;
  background: #FFFFFF !important;
}
.n8n-chat textarea::placeholder {
  color: #A8A8B2 !important;
  font-size: 13.5px !important;
}


/* ── Send Button ─────────────────────────────────── */
.n8n-chat .chat-input button,
.n8n-chat .send-button,
.n8n-chat [class*="send-button"],
.n8n-chat [class*="send_button"],
#n8n-chat .chat-input button {
  background: #CF4F36 !important;
  border: none !important;
  border-radius: 10px !important;
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  min-height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #FFFFFF !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
  transition: background 180ms ease, transform 120ms ease !important;
}
.n8n-chat .chat-input button:hover,
#n8n-chat .chat-input button:hover {
  background: #C04830 !important;
  transform: scale(1.06) !important;
}
.n8n-chat .chat-input button:disabled {
  background: #E2E1DE !important;
  transform: none !important;
  cursor: default !important;
}

`;

export default function N8nChatWidget() {
  useEffect(() => {
    // 1. n8n base stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    // 2. Theme overrides — appended after link so source-order cascade wins
    const style = document.createElement("style");
    style.textContent = THEME_CSS;
    document.head.appendChild(style);

    // 3. Chat module — initialised after styles are in the DOM
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
            title: 'Nabeel AI',
            subtitle: 'Turning complex into clear.',
            footer: '',
            getStarted: 'Start a conversation',
            inputPlaceholder: 'Ask about my work, experience, or how I build AI products…',
            closeButtonTooltip: 'Close',
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
