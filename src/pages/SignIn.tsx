import { SignInForm } from "../features/authentication";
import styles from "../assets/style/authPage.module.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <main className={styles.authContainer}>
      <SignInForm></SignInForm>
      
    </main>
  );
}

export default SignIn;
