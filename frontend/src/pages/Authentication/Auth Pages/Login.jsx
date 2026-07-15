import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-50">
      <h1 className="text-2xl font-bold">Login</h1>
      <input value="dump@gmail.com" className="border border-gray-300 px-4 py-2 rounded-md" type="text" placeholder="Email" />
      <input value="password" className="border border-gray-300 px-4 py-2 rounded-md" type="password" placeholder="Password" />
      <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/dashboard")}>
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
