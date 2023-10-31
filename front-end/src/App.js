import { React } from 'react';
import { Routes, Route } from "react-router-dom"
import "./styles/App.css"
import Home from './component/Home';
import Dashboard from './component/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />{/*Makes the home container the default view*/}
        <Route path="/dashboard" element={<Dashboard />} />{/*Creates a route to the dashboard component*/}
      </Routes>
    </div>
  );
}

export default App;
