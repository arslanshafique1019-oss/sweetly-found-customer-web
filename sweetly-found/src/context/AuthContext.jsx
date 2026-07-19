import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const USERS_STORAGE_KEY = "sweetly-found-users";
const SESSION_STORAGE_KEY = "sweetly-found-session";

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeStorage(key) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(USERS_STORAGE_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => readStorage(SESSION_STORAGE_KEY, null));

  useEffect(() => {
    writeStorage(USERS_STORAGE_KEY, users);
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      writeStorage(SESSION_STORAGE_KEY, currentUser);
    } else {
      removeStorage(SESSION_STORAGE_KEY);
    }
  }, [currentUser]);

  const signup = useCallback((payload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const duplicate = users.some((user) => user.email.toLowerCase() === normalizedEmail);
    if (duplicate) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: payload.name.trim(),
      email: normalizedEmail,
      password: payload.password,
      phone: payload.phone?.trim() || "",
      location: payload.location?.trim() || "",
      birthday: payload.birthday || "",
      about: payload.about?.trim() || "",
      newsletter: Boolean(payload.newsletter),
      provider: payload.provider || "email",
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  }, [users]);

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password);
    if (!user) {
      throw new Error("We couldn't find an account with that email and password.");
    }

    setCurrentUser(user);
    return user;
  }, [users]);

  const loginWithGoogle = useCallback((displayName = "Google User") => {
    const email = `google.${Date.now()}@sweetlyfound.com`;
    const existing = users.find((candidate) => candidate.provider === "google" && candidate.email === email);
    if (existing) {
      setCurrentUser(existing);
      return existing;
    }

    const newUser = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: displayName.trim() || "Google User",
      email,
      password: "",
      phone: "",
      location: "",
      birthday: "",
      about: "Signed in with Google",
      newsletter: true,
      provider: "google",
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value = useMemo(() => ({
    users,
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
  }), [users, currentUser, signup, login, loginWithGoogle, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
