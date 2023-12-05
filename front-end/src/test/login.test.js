import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';
import Login from '../component/user/Login/Login'

/* Mock the react-router-dom module*/
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

/*test UI components*/
describe("On login page render", () => {
    it("should display the login form div", () => {
        const { getByTestId } = render(
            <Router>
                <Login />
            </Router>
        );
        const loginFormDiv = screen.getByTestId("login-form-div");
        expect(loginFormDiv).toBeTruthy();

    });
    it("should display the login form", () => {
        const { getByTestId } = render(
            <Router>
                <Login />
            </Router>
        );
        const loginForm = screen.getByTestId("login-submission-form");
        expect(loginForm).toBeTruthy();
    });
    it("should display the login button", () => {
        const { getByTestId } = render(
            <Router>
                <Login />
            </Router>
        );
        const loginButton = screen.getByTestId("login-button");
        expect(loginButton).toBeTruthy();

    });
    it("should display the sign up button", () => {
        const { getByTestId } = render(
            <Router>
                <Login />
            </Router>
        );
        const signUpButton = screen.getByTestId("sign-up-button");
        expect(signUpButton).toBeTruthy();
    });
});
