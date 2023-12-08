import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import cooking_icon from "../../assets/cooking_icon.png"
import UserInfo from '../../config/UserInfo';
import endPoints from '../../config/fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/NavigationBar.css'

const NavigationBar = () => {
    /*We need to redirect using the react-router-dom Link instead because using any other will refresh the page, thus context */
    const navigate = useNavigate();
    const { userInformation, setUserInformation, status, setStatus } = useContext(UserInfo);

    const Loggout = async () => {
        if (!status.LoggedIn) {
            return;
        };
        try {
            const response = await fetch(`${endPoints.loggoutEndpoint}`);
            if (response.ok) {
                const res = await response.json();
                console.log(res);
                setStatus(false);
                setUserInformation({
                    username: null,
                    email: null,
                    id: null
                });
                document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";//deletes cookie
                window.location.reload();
                navigate("/");
                return;
            }
            else {
                const errorData = await response.json();
                console.log(errorData);
            };
        }
        catch (error) {
            console.log(error);
        };
    };

    return (
        <Navbar className='nav-color' expand="lg">
            <Navbar.Brand as={Link} to="/" className='nav-brand'>
                <img src={cooking_icon} alt="cooking-icon" className='cooking-icon' />
            </Navbar.Brand>
            <Navbar.Toggle className='navbar-toggle' aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown" className='collpased-bar'>
                <Nav className="mr-auto" >
                    <Nav.Link as={Link} to="/inventory" className='nav-item'>Inventory</Nav.Link>
                    <Nav.Link as={Link} to="#" className='nav-item'>Calendar</Nav.Link>
                    <Nav.Link as={Link} to="/recipes" className='nav-item'>Recipes</Nav.Link>
                    {status.LoggedIn ? <div></div> :
                        <Nav.Link as={Link} to="/login" className='nav-item'>Sign In</Nav.Link>}
                    <NavDropdown className='nav-item' title="Profile" id="navbarDropdownMenuLink">
                        <NavDropdown.Item as={Link} to="/profile" className='profile-text'>View settings</NavDropdown.Item>
                        <NavDropdown.Item className='profile-text' onClick={Loggout}> Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
