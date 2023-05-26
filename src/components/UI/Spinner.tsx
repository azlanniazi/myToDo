import { RotateLoader, MoonLoader, SyncLoader } from "react-spinners";
import styles from "../../assets/style/UI/Spinner.module.css";
import Modal from "./Modal";

interface SpinnerProps {
  type: "wholePage" | "modal" | "insideContainer";
}

function Spinner({ type }: SpinnerProps) {
  switch (type) {
    case "wholePage":
      return (
        <div className={styles.wholePage}>
          <MoonLoader color="#6d28d9"></MoonLoader>
        </div>
      );
    case "insideContainer":
      return (
        <div className={styles.insideContainer}>
          <MoonLoader size={20} color="#6d28d9"></MoonLoader>
        </div>
      );
    case "modal":
      return (
        <Modal
          style={{
            background: "transparent",
            left: "50%",
            top: "45%",
          }}
          onClose={() => {}}
        >
          <div className={styles.modal}>
            <MoonLoader color="#6d28d9"></MoonLoader>
          </div>
        </Modal>
      );
  }

  return (
    <div className={styles.spinner}>
      <RotateLoader color="#6d28d9"></RotateLoader>
    </div>
  );
}

export default Spinner;
