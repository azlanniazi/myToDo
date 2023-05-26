import classes from "../../assets/style/UI/card.module.css";

interface CardProps {
  children: JSX.Element | JSX.Element[];
  className: string;
  onClick?: () => void;
}

function Card({ children, className, onClick }: CardProps) {
  const classesNames = `${classes.card} ${className}`;
  return (
    <div className={classesNames} onClick={onClick}>
      {children}{" "}
    </div>
  );
}

export default Card;
