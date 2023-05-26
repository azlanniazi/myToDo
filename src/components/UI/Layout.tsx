import { Outlet } from "react-router-dom";
import classes from "../../assets/style/UI/layout.module.css";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import InnerLayout from "./InnerLayout";
import { useAppSelector } from "../../store";
import { getShowMobileNav } from "../../store/UISlice";

// Layout Props
interface LayoutProps {
  children: React.ReactElement;
}

const Layout = function ({ children }: LayoutProps) {
  return (
    <div className={classes.layout}>
      <NavBar></NavBar>
      <SideBar></SideBar>
      <InnerLayout>
        <Outlet></Outlet>
      </InnerLayout>
    </div>
  );
};

export default Layout;
