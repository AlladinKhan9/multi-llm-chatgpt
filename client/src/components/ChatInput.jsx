import { useState } from 'react';

const MODELS = ['ChatGPT', 'Gemini', 'Claude'];

export default function ChatInput({ onSend, loading, selectedModel, onModelChange }) {
  const [prompt, setPrompt] = useState('');

  const submit = async () => {
    if (!prompt.trim() || loading) return;
    const ok = await onSend(prompt);
    if (ok) setPrompt('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <section className="chat-input">
      <select value={selectedModel} onChange={(e) => onModelChange(e.target.value)}>
        {MODELS.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask anything..."
      />

      <button className="btn btn-primary" onClick={submit} disabled={loading}>
        {loading ? 'Generating...' : 'Generate responses'}
      </button>
    </section>
  );
}
