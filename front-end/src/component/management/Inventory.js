import React, { useEffect, useState } from "react";
import Select from 'react-select';
import endPoints from '../../config/fetch.js'
import lists from "../../config/list.js";

const Inventory = (props) => {
    const { userInformation, setUserInformation } = useContext(UserInfo);
    console.log(userInformation.id)
    return(
        <div>
            {userInformation.id}
        </div>
    )
}

export default Inventory