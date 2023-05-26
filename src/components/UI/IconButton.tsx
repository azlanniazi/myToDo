import { useState } from "react";
import styles from "../../assets/style/UI/iconButton.module.css";
import Tooltip from "./Tooltip";

interface IconButtonProps {
  tip: string;
  onClick: () => void;
  children: JSX.Element;
}

function IconButton({ tip, onClick, children }: IconButtonProps) {
  const [hovering, setHovering] = useState(false);

  const handleOnMouseEnter = () => {
    setHovering(true);
  };
  const handleOnMouseLeave = () => {
    setHovering(false);
  };
  return (
    <div className={styles.iconButtonContainer}>
      <button
        className={styles.iconButton}
        onMouseLeave={handleOnMouseLeave}
        onMouseEnter={handleOnMouseEnter}
        onClick={onClick}
      >
        {children}
      </button>
      {hovering && <Tooltip text={tip}></Tooltip>}
    </div>
  );
}

export default IconButton;
