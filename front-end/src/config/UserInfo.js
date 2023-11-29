import { React, createContext, useState } from "react";

export const UserInfo = createContext(null);

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

    return(
        <UserInfo.Provider value={value}>
            {children}
        </UserInfo.Provider>
    );
};

export default UserInfo;