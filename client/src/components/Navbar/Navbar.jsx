import { useLocation } from 'react-router-dom';
import NavbarDesign from 'NavbarDesign';

function Navbar() {
    const { pathname } = useLocation();
    const isAuthPage = pathname === '/signin' || pathname === '/signup';
    return <NavbarDesign isAuthPage={isAuthPage} />;
}

export default Navbar;