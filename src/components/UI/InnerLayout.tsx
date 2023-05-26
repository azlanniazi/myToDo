import { getShowNotes, useAppSelector } from "../../store";
import classes from "../../assets/style/UI/innerLayout.module.css";
import { Outlet } from "react-router-dom";
import { Notes } from "../../features/notes";

interface InnerLayoutProps {
  children: React.ReactElement;
}

function InnerLayout({ children }: InnerLayoutProps) {
  const showNotes = useAppSelector(getShowNotes);

  // defining class name based on whether showNotes is true or false
  const styledClasses = showNotes
    ? classes.innerLayoutCol2
    : classes.innerLayoutCol1;
  return (
    <main className={styledClasses}>
      <Outlet></Outlet>
      {showNotes && <Notes></Notes>}
    </main>
  );
}

export default InnerLayout;
