import { useAuth } from "../../hooks/CustomLoginHook.jsx";
import { Outlet, Navigate } from "react-router-dom";

const AuthControler = () => {
  const { isUserLogin } = useAuth();

  return (
    <>{ !isUserLogin ? <Outlet /> : <Navigate to="/dashboard" replace /> }</>
  )
}

export default AuthControler