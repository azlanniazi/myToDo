import { useState } from "react";
import styles from "../../assets/style/UI/iconButton.module.css";
import Tooltip from "./Tooltip";

interface IconButtonProps {
  tip: string;
  onClick: () => void;
  children: JSX.Element;
  style?: { [key: string]: string };
}

function IconButton({ tip, onClick, children, style }: IconButtonProps) {
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
      {hovering && <Tooltip style={style} text={tip}></Tooltip>}
    </div>
  );
}

export default IconButton;
