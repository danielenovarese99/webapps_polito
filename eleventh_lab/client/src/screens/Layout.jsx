import NavBarComponent from "../components/MyNavBar";
import { Outlet } from "react-router-dom";

function Layout(props) {

    return (
        <>
            <NavBarComponent logoutaction={props.logoutaction} />
            <Outlet />
        </>
    )
}
export default Layout;