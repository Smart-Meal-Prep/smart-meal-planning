import { React, useState, useEffect, useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import Dashboard from './component/Dashboard/Dashboard';
import Register from './component/user/Register';
import Login from './component/user/Login';
import Profile from './component/user/Profile'
import Inventory from './component/management/Inventory';
import Recipes from './component/management/Recipes';
import "./styles/App.css"
import { UserInfoProvider } from './config/UserInfo';


const App = () => {
  const [inventory, setUserInventory] = useState([{
    id: null,
    ingredient: null,
    quantity: null
  }]);

  const [profile, setProfile] = useState({
    allergies: [],
    prefereces: [],
    allergiesOptions: [],
    preferecesOptions: [],
  });

  const [recipes, setRecipes] = useState([{}]);

  return (
    <UserInfoProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory userInventory={inventory} setUserInventory={setUserInventory} />} />
          {/*
          <Route path='/profile' element={<Profile userInformation={userInformation} profile={profile} setProfile={setProfile} />} />
          <Route path="/register" element={<Register userInformation={userInformation} />} />
          
          <Route path="/recipes" element={<Recipes userInformation={userInformation} recipes={recipes} setRecipes={setRecipes}/>} />
          */}
        </Routes>
        
      </div>
    </UserInfoProvider>
  );
}

export default App;
