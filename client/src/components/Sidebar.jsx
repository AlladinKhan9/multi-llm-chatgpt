export default function Sidebar({ history, loadChat, newChat, deleteChat }) {
  return (
    <aside className="sidebar">
      <h2>Multi LLM</h2>

      <button className="btn btn-primary btn-block" onClick={newChat}>
        + New chat
      </button>

      <h3>Previous chats</h3>
      {history.length === 0 && <p className="muted">No chats yet.</p>}

      <ul className="history">
        {history.map((chat) => (
          <li key={chat.id} className="history-item">
            <button className="history-title" onClick={() => loadChat(chat)}>
              {chat.prompt}
            </button>
            <button
              className="btn btn-secondary btn-small"
              aria-label="Delete chat"
              onClick={() => deleteChat(chat.id)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
