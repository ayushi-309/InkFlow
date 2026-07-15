import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 p-5">
      <button onClick={() => navigate("/posts")} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Posts
      </button>
      <button onClick={() => navigate("/categories")} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Categories
      </button>
      <button onClick={() => navigate("/user")} className="bg-red-500 text-white px-4 py-2 rounded-md">
        User
      </button>
    </div>
  );
}

export default Dashboard