import NavbarDesign from './NavbarDesign';

const Navbar = ({ activeSection, onSectionClick }) => {

    return (
        <>
            <NavbarDesign activeSection={activeSection} onSectionClick={onSectionClick} />
        </>
    )
}

export default Navbar;