---
Task ID: 1
Agent: Main Agent
Task: Add "New conversation" button and privacy notice to chatbot

Work Log:
- Analyzed chatbot.tsx to understand chat history architecture (localStorage per browser, useSyncExternalStore)
- Added RotateCcw icon to icons.tsx (import + iconMap + export)
- Added translations: chat.newChat (ES: "Nueva conversación", EN: "New conversation") and chat.private (ES: "Tu chat es privado y solo se guarda en tu navegador", EN: "Your chat is private and only saved in your browser")
- Added clearChat callback to chatbot.tsx that removes localStorage key and resets cache
- Added RotateCcw button in header next to X close button
- Added privacy notice text above input area
- Verified build compiles successfully

Stage Summary:
- Chatbot now has per-user privacy (already was, now explicitly communicated)
- Users can clear their chat history with the new "New conversation" button
- Privacy notice visible at bottom of chat
- Build passes successfully
