import { useCallback, useEffect, useState } from 'react';
import { getHistory, sendChat, removeChat } from '../api';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshHistory = useCallback(async () => {
    try {
      setHistory(await getHistory());
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const send = async (prompt, systemPrompt) => {
    if (!prompt.trim()) return false;
    setLoading(true);
    setError('');
    try {
      const data = await sendChat(prompt, systemPrompt);
      setMessages((prev) => [
        ...prev,
        { prompt, chatgpt: data.chatgpt, gemini: data.gemini, claude: data.claude },
      ]);
      refreshHistory();
      return true;
    } catch (e) {
      console.error(e);
      setError('Could not reach the server. Check that the backend is running.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadChat = (chat) =>
    setMessages([
      { prompt: chat.prompt, chatgpt: chat.chatgpt, gemini: chat.gemini, claude: chat.claude },
    ]);

  const newChat = () => {
    setMessages([]);
    setError('');
  };

  const deleteChat = async (id) => {
    try {
      await removeChat(id);
      refreshHistory();
    } catch (e) {
      console.error(e);
      setError('Could not delete that chat.');
    }
  };

  return { messages, history, loading, error, send, loadChat, newChat, deleteChat };
}
