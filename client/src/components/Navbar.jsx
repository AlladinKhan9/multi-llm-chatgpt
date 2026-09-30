export default function Navbar({ onLogout }) {
  return (
    <header className="navbar">
      <div>
        <h1>Multi LLM Chat</h1>
        <p className="muted">Compare ChatGPT, Gemini, and Claude in one place.</p>
      </div>
      <button className="btn btn-secondary" onClick={onLogout}>Log out</button>
    </header>
  );
}
