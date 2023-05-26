import { SignInForm } from "../features/authentication";
import styles from "../assets/style/authPage.module.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <main className={styles.authContainer}>
      <SignInForm></SignInForm>
      <Link to="/signup" className="registerLink">
        Sign Up Instead
      </Link>
    </main>
  );
}

export default SignIn;
