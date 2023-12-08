import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../component/user/Register/Register";
import '@testing-library/jest-dom';

/* Mock the react-router-dom module*/
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

/*test UI components*/
describe("On registration page render", () => {
    it("should display the registration form div", () => {
        const { getByTestId } = render(
            <Router>
                <Register />
            </Router>
        );
        const registrationFormDiv = screen.getByTestId("registration-form-div");
        expect(registrationFormDiv).toBeTruthy();

    });
    it("should display the registration form", () => {
        const { getByTestId } = render(
            <Router>
                <Register />
            </Router>
        );
        const registrationForm = screen.getByTestId("registration-submission-form");
        expect(registrationForm).toBeTruthy();
    });
    it("should display the login button", () => {
        const { getByTestId } = render(
            <Router>
                <Register />
            </Router>
        );
        const registrationButton = screen.getByTestId("login-button");
        expect(registrationButton).toBeTruthy();

    });
    it("should display the sign up button", () => {
        const { getByTestId } = render(
            <Router>
                <Register />
            </Router>
        );
        const signUpButton = screen.getByTestId("sign-up-button");
        expect(signUpButton).toBeTruthy();
    });
});