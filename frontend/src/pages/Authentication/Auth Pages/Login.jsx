import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/CustomLoginHook.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { toggleLoginUser } = useAuth();

  const handleLogin = () => {
    toggleLoginUser();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-50">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        defaultValue="dump@gmail.com"
        className="border border-gray-300 px-4 py-2 rounded-md"
        type="text"
        placeholder="Email"
      />
      <input
        defaultValue="password"
        className="border border-gray-300 px-4 py-2 rounded-md"
        type="password"
        placeholder="Password"
      />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={handleLogin}
      >
        Login
      </button>
      <p>
        don't have an account <Link to={"/signup"}>Signup</Link>
      </p>
      <p>
        Forget Password <Link to={"/forget-password"}>Forget Password</Link>
      </p>
    </div>
  );
};

export default Login;
