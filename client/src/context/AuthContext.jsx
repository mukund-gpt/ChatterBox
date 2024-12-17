import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  // Function to get a cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
  };

  const [authUser, setAuthUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return getCookie("access_token") ? user : null;
  });

  useEffect(() => {
    if (!getCookie("access_token")) {
      localStorage.clear();
      setAuthUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
