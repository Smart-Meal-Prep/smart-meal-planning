import { React, useState, useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from './component/Dashboard/Dashboard';
import Register from './component/user/Register/Register';
import Login from './component/user/Login/Login';
import Inventory from './component/management/Inventory/Inventory';
import Recipes from './component/management/Recipes/Recipes';
import Profile from './component/user/Profile/Profile';
import UserInfo from './config/UserInfo';
import "./styles/App.css"

const App = () => {
  const [userInformation, setUserInformation] = useState({
    username: null,
    email: null,
    id: null
  });

  const [status, setStatus] = useState({
    LoggedIn: false
  });

  let value = {
    userInformation,
    setUserInformation,
    status,
    setStatus
  };

  const [inventory, setUserInventory] = useState([{
    id: null,
    ingredient: null,
    quantity: null
  }]);

  const [profile, setProfile] = useState({
    allergies: [],
    prefereces: [],
    favoriteMeals: [],
    allergiesOptions: [],
    preferecesOptions: [],
    favoriteMealsOptions: []
  });

  const [recipes, setRecipes] = useState([{}]);

  return (
    <UserInfo.Provider value={value}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={
            status.LoggedIn ?
              (<Inventory userInventory={inventory} setUserInventory={setUserInventory} />) : (<Navigate to="/login" />)} />
          <Route path='/profile' element={
            status.LoggedIn ?
              (<Profile profile={profile} setProfile={setProfile} />) : (<Navigate to="/login" />)} />
          <Route path="/recipes" element={
            status.LoggedIn ?
              (<Recipes recipes={recipes} setRecipes={setRecipes} />) : (<Navigate to="/login" />)} />
        </Routes>
      </div>
    </UserInfo.Provider>
  );
}

export default App;