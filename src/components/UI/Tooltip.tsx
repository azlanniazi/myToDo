import styles from "../../assets/style/UI/tooltip.module.css";

interface TooltipProps {
  text: string;
  style?: { [key: string]: string };
}

function Tooltip({ text, style }: TooltipProps) {
  return (
    <div className={styles.tooltipContainer} style={style}>
      <p className={styles.tooltip}>{text}</p>
    </div>
  );
}

export default Tooltip;
