import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = ({ username, password }) => {
    setError("");
    setLoading(true);

    axios
      .post(
        "https://dummyjson.com/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setError("Erro ao fazer login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(user?.token),
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
