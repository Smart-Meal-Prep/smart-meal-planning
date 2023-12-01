import { createContext } from "react";

export const UserInfo = createContext({
    userInformation: {
        username: null,
        email: null,
        id: null
    },
    setUserInformation: () => { }
});

export default UserInfo;