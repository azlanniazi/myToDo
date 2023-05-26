import styles from "../assets/style/authPage.module.css";
import { SignUpFrom } from "../features/authentication";

function SignUp() {
  return (
    <main className={styles.authContainer}>
      <SignUpFrom></SignUpFrom>;
    </main>
  );
}

export default SignUp;
