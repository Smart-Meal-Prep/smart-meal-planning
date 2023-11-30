import { React, createContext, useState } from "react";

export const UserInfo = createContext({
    userInformation: {
        username: null,
        email: null,
        id: null
    },
    setUserInformation: () => { }
});

export default UserInfo;

/*
export const UserInfoProvider = ({ children }) => {
    const [userInformation, setUserInformation] = useState({
        username: null,
        email: null,
        id: null
    });

    const value = {
        userInformation,
        setUserInformation
    };//export values from context
};
*/