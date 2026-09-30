import ResponseCard from './ResponseCard';

const MODELS = [
  ['ChatGPT', 'chatgpt'],
  ['Gemini', 'gemini'],
  ['Claude', 'claude'],
];

export default function ChatMessage({ message, onContinue }) {
  return (
    <div className="message">
      <div className="user-prompt">
        <h3>You</h3>
        <p>{message.prompt}</p>
      </div>

      <div className="responses">
        {MODELS.map(([title, key]) => (
          <ResponseCard
            key={key}
            title={title}
            response={message[key]}
            onContinue={onContinue}
          />
        ))}
      </div>
    </div>
  );
}
