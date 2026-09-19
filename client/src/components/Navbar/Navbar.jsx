import { useLocation } from 'react-router-dom';
import NavbarDesign from './NavbarDesign';

function Navbar() {
    const { pathname } = useLocation();
    return <NavbarDesign pathname={pathname} />;
}

export default Navbar;