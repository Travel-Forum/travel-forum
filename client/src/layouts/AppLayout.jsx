import AppNavbar from "../components/navbar/AppNavbar";
import { Outlet } from 'react-router-dom';

const AppLayout = () => (
  <>
    <AppNavbar />
    <Outlet />
  </>
);

export default AppLayout;