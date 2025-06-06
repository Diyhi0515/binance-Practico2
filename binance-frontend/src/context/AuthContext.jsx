import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (access_token, userData) => {
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);

    setToken(access_token);
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
