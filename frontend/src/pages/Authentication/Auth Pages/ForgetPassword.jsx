import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div>
      ForgetPassword
      <p>
        don't have an account <Link to={"/signup"}>Signup</Link>
      </p>
      <p>
        I have an account <Link to={"/login"}>login</Link>
      </p>
    </div>
  );
};

export default ForgetPassword;
