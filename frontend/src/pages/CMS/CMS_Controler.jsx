import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/CustomLoginHook.jsx";
import { CMSSidebar } from "../../components/index.js";

const CMS_Controler = () => {
  const { isUserLogin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isUserLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <CMSSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main content — scrolls independently */}
      <main className="flex-1 flex flex-col overflow-y-auto px-6 lg:px-8 py-8 min-w-0 min-h-0">
        <Outlet context={{ setIsSidebarOpen }} />
      </main>
    </div>
  );
};

export default CMS_Controler;