import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      Login
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
