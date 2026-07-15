import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const CMS_Controler = () => {
  const [isCMSLoggedIn, setIsCMSLoggedIn] = useState(false);

  return (
    <>{ isCMSLoggedIn ? <Outlet /> : <Navigate to="/login" replace /> }</>
  );
};

export default CMS_Controler