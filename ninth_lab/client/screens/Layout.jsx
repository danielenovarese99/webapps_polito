import NavBarComponent from "../components/MyNavBar";
import { Outlet } from "react-router-dom";


function Layout() {

    
    return (
        <>
            <NavBarComponent />
            <Outlet />
        </>
    )
}
export default Layout;