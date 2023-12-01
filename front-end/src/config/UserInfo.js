import { createContext } from "react";

export const UserInfo = createContext({
    userInformation: {
        username: null,
        email: null,
        id: null
    },
    status: {
        LoggedIn: false
    },
    setUserInformation: () => { },
    setStatus: () => { }
});

export default UserInfo;