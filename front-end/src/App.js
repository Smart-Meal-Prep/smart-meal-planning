import { React } from 'react';
import { Routes, Route, useState } from "react-router-dom"
import Dashboard from './component/Dashboard';
import Register from './component/user/Register';
import Login from './component/user/Login';
import Profile from './component/user/Profile'
import "./styles/App.css"

const App = () => {
  const [userInformation, setUserInformatio] = useState({
    username: null,
    email: null,
    id: null
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Dashboard 
            userInformation={userInformation} 
            setUserInformatio={setUserInformatio}
          />
        } />{/*Makes the home dashboard the default view*/}
        <Route path='/profile' element={<Profile userInformation={userInformation}/>}/>
        <Route path="/register" element={<Register userInformation={userInformation}/>} />
        <Route path="/login" element={<Login userInformation={userInformation}/>} />    
      </Routes>
    </div>
  );
}

export default App;
