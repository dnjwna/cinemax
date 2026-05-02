import { createContext, useContext, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("cinemax_token") || null
  );

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cinemax_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    const token = response.data.token;
    const user = response.data.user;

    setToken(token);
    setUser(user);

    localStorage.setItem("cinemax_token", token);
    localStorage.setItem("cinemax_user", JSON.stringify(user));
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {}

    setToken(null);
    setUser(null);

    localStorage.removeItem("cinemax_token");
    localStorage.removeItem("cinemax_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}