import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      Signup
      <p>
        I have an account <Link to={"/login"}>Login </Link>
      </p>
      <p>
        Forget Password <Link to={"/forget-password"}>Forget Password</Link>
      </p>
    </div>
  );
};

export default Signup;
