import { useLocation } from 'react-router-dom';
import NavbarDesign from './NavbarDesign';

const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <>
            <NavbarDesign pathname={pathname} />
        </>
    )
}

export default Navbar;