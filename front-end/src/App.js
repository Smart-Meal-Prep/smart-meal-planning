import { React, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Dashboard from './component/Dashboard';
import Register from './component/user/Register';
import Login from './component/user/Login';
import Profile from './component/user/Profile'
import Inventory from './component/management/Inventory';
import "./styles/App.css"

const App = () => {
  const [userInformation, setUserInformation] = useState(() => {
    const storedUserInformation = sessionStorage.getItem('userInformation');
    return storedUserInformation ? JSON.parse(storedUserInformation) : {
      username: null,
      email: null,
      id: null
    };//retrieves the user information if it exists. If it doesnt return a null/empty user information
  });

  useEffect(() => {
    /* Update sessionStorage whenever userInformation changes*/
    sessionStorage.setItem('userInformation', JSON.stringify(userInformation));
  }, [userInformation]);

  const [inventory, setUserInventory] = useState([{
    id: null,
    ingredient: null,
    quantity: null
  }]);//used to set and get the usersInventory

  const [profile, setProfile] = useState({
    allergies: [],
    prefereces: []
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Dashboard
            userInformation={userInformation}
            setUserInformation={setUserInformation}
          />
        } />{/*Makes the home dashboard the default view*/}
        <Route path='/profile' element={<Profile userInformation={userInformation} profile={profile} setProfile={setProfile} />} />
        <Route path="/register" element={<Register userInformation={userInformation} />} />
        <Route path="/login" element={<Login userInformation={userInformation} />} />
        <Route path="/inventory" element={<Inventory userId={userInformation.id} userInventory={inventory} setUserInventory={setUserInventory} />} />
      </Routes>
    </div>
  );
}

export default App;
