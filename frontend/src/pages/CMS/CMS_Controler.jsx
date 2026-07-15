import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/CustomLoginHook.jsx";

const CMS_Controler = () => {
  const { isUserLogin } = useAuth();
  console.log(`User Login State is: ${isUserLogin}`)

  return (
    <>{ isUserLogin ? <Outlet /> : <Navigate to="/login" replace /> }</>
  );
};

export default CMS_Controler;