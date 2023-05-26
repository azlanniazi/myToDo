import styles from "../../assets/style/UI/tooltip.module.css";

interface TooltipProps {
  text: string;
}

function Tooltip({ text }: TooltipProps) {
  return (
    <div className={styles.tooltipContainer}>
      <p className={styles.tooltip}>{text}</p>
    </div>
  );
}

export default Tooltip;
