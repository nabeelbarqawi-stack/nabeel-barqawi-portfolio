"use client";

import { useEffect } from "react";

export default function N8nChatWidget() {
  useEffect(() => {
    // Inject n8n chat stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    // Inject as a module script so the ESM import works natively
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
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return null;
}
