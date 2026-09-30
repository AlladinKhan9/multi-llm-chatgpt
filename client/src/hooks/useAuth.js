import { useState } from 'react';

const KEY = 'user';

// NOTE: this is a front-end-only placeholder. It does NOT verify a password.
// Replace login() with a real call to your backend before going live.
export default function useAuth() {
  const [user, setUser] = useState(() => localStorage.getItem(KEY));

  const login = (username, password) => {
    if (!username.trim() || !password) return false;
    localStorage.setItem(KEY, username.trim());
    setUser(username.trim());
    return true;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return { user, isLoggedIn: Boolean(user), login, logout };
}
