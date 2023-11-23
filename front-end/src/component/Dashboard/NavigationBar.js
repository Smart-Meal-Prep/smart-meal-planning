import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import cooking_icon from "../../assets/cooking_icon.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/NavigationBar.css'

const NavigationBar = () => {
    return (
        <Navbar className='nav-color' expand="lg">
            <Navbar.Brand href="/" className='nav-brand'>
                <img src={cooking_icon} alt="cooking-icon" className='cooking-icon'/>
            </Navbar.Brand>
            <Navbar.Toggle className='navbar-toggle' aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown" className='collpased-bar'>
                <Nav className="mr-auto" >
                    <Nav.Link className='nav-item' href="/inventory">Inventory</Nav.Link>
                    <Nav.Link className='nav-item' href="#">Calendar</Nav.Link>
                    <Nav.Link className='nav-item' href="#">Recipes</Nav.Link>
                    <Nav.Link className='nav-item' href="/login">Sign In</Nav.Link>
                    <NavDropdown className='nav-item' title="Profile" id="navbarDropdownMenuLink">
                        <NavDropdown.Item href="/profile" className='profile-text'>View settings</NavDropdown.Item>
                        <NavDropdown.Item href="#" className='profile-text'>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar
