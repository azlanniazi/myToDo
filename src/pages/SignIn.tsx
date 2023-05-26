import { SignInForm } from "../features/authentication";
import styles from "../assets/style/authPage.module.css";

function SignIn() {
  return (
    <main className={styles.authContainer}>
      <SignInForm></SignInForm>
    
    </main>
  );
}

export default SignIn;
