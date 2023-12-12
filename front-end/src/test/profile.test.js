import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';
import Profile from "../component/user/Profile/Profile";

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
    it("should display the profile sidebar div", () => {
        const { getByTestId } = render(
            <Router>
                <Profile />
            </Router>
        );
        const sideBarDiv = screen.getByTestId("profile-side-bar");
        expect(sideBarDiv).toBeTruthy();
    });

    it("should display the profile sidebar buttons", () => {
        const { getByTestId } = render(
            <Router>
                <Profile />
            </Router>
        );
        const sideBarButtons = screen.getByTestId("side-bar-buttons");
        expect(sideBarButtons).toBeTruthy();
    });

    it("should render the button content", () => {
        const { getByTestId } = render(
            <Router>
                <Profile />
            </Router>
        );
        const sideBarData = screen.getByTestId("side-bar-data");
        expect(sideBarData).toBeTruthy();
    });
}
);