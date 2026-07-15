import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching user form Backend
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/1',{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(json => {
        if (json.id === 1)
          setIsUserLogin(true)
        else
          setIsUserLogin(false)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  // Getting if user is logged in or not
  const getIsUserLogin = () => {
    return isUserLogin;
  };

  // Function for Toggling user to change the user Login -> Logout state
  const toggleLoginUser = () => {
    setIsUserLogin((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-sm font-serif font-semibold text-slate-700 tracking-wide animate-pulse">InkFlow</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isUserLogin, isLoading, getIsUserLogin, toggleLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export {
  AuthProvider,
  useAuth,
};
