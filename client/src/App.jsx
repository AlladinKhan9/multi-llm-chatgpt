import { useEffect, useRef, useState } from 'react';

import useAuth from './hooks/useAuth';
import useChat from './hooks/useChat';

import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';

const SYSTEM_PROMPT = 'You are a helpful AI assistant.';

export default function App() {
  const { isLoggedIn, login, logout } = useAuth();
  const chat = useChat();
  const [selectedModel, setSelectedModel] = useState('ChatGPT');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  if (!isLoggedIn) return <LoginForm onLogin={login} />;

  return (
    <div className="layout">
      <Sidebar
        history={chat.history}
        loadChat={chat.loadChat}
        newChat={chat.newChat}
        deleteChat={chat.deleteChat}
      />

      <main className="main">
        <Navbar onLogout={logout} />

        <ChatInput
          loading={chat.loading}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          onSend={(prompt) => chat.send(prompt, SYSTEM_PROMPT)}
        />

        {chat.error && <p className="error">{chat.error}</p>}

        {chat.messages.length === 0 ? (
          <div className="empty">
            <h2>Start a conversation</h2>
            <p>Ask a question to see all three models answer side by side.</p>
          </div>
        ) : (
          chat.messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} onContinue={setSelectedModel} />
          ))
        )}
        <div ref={endRef} />
      </main>
    </div>
  );
}
