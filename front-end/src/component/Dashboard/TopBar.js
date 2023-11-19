import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const TopBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="mr-auto">
                    <Nav.Link href="/inventory">Inventory</Nav.Link>
                    <Nav.Link href="#">Calendar</Nav.Link>
                    <Nav.Link href="#">Recipes</Nav.Link>
                    <Nav.Link href="/login">Sign In</Nav.Link>
                    <NavDropdown title="Profile" id="navbarDropdownMenuLink">
                        <NavDropdown.Item href="/profile">View settings</NavDropdown.Item>
                        <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopBar
