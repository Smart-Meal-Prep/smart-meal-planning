import { React } from 'react';
import { Routes, Route } from "react-router-dom"
import Dashboard from './component/Dashboard';
import Register from './component/user/Register';
import Login from './component/user/Login';
import "./styles/App.css"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />{/*Makes the home dashboard the default view*/}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
