import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../styles/TopBar.css'

const TopBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#" className='nav-brand'>Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="mr-auto" >
                    <Nav.Link className='nav-item' href="/inventory">Inventory</Nav.Link>
                    <Nav.Link className='nav-item' href="#">Calendar</Nav.Link>
                    <Nav.Link className='nav-item' href="#">Recipes</Nav.Link>
                    <Nav.Link className='nav-item' href="/login">Sign In</Nav.Link>
                    <NavDropdown className='nav-item' title="Profile" id="navbarDropdownMenuLink">
                        <NavDropdown.Item href="/profile">View settings</NavDropdown.Item>
                        <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopBar
