import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ICONS = { ChatGPT: '🤖', Gemini: '✨', Claude: '🧠' };

export default function ResponseCard({ title, response = '', onContinue }) {
  const [shown, setShown] = useState('');
  const [copied, setCopied] = useState(false);

  // Typing effect
  useEffect(() => {
    let i = 0;
    setShown('');
    const timer = setInterval(() => {
      i += 1;
      setShown(response.slice(0, i));
      if (i >= response.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [response]);

  const copy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="response-card">
      <header>
        <h2>{ICONS[title]} {title}</h2>
        <button className="btn btn-outline btn-small" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </header>

      <div className="markdown">
        <ReactMarkdown>{shown}</ReactMarkdown>
      </div>

      <button className="btn btn-primary btn-block" onClick={() => onContinue(title)}>
        Continue with {title}
      </button>
    </article>
  );
}
