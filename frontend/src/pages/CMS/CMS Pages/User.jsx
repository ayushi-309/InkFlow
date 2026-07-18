import { useOutletContext } from "react-router-dom";
import { CMSHeader } from "../../../components/index.js";

const User = () => {
  const { setIsSidebarOpen } = useOutletContext();

  return (
    <div className="flex flex-col flex-1 px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="flex-shrink-0">
        <CMSHeader
          title="User Profile"
          subtitle="Manage your editor account and preferences."
          searchValue=""
          onSearchChange={() => {}}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>
      <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 text-slate-500 font-medium flex items-center justify-center min-h-[300px]">
        User Profile Module (Coming Soon)
      </div>
    </div>
  );
};

export default User;