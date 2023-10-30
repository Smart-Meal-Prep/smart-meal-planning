import "./styles/App.css"
import React from 'react';
import { SmartMealsLogo } from "./components/SmartMealsLogo";
import { NavBar } from "./components/NavBar";
import { Passwordinput } from "./components/PasswordInput";
import { EmailInput } from "./components/EmailInput";

function App() {
  return (
    <div className="App">
      <SmartMealsLogo />
      <NavBar />

      <div className="dashboardBG" style={{width: 1279, height: 643, left: 81, top: 241, position: 'absolute', background: '#EAC08F', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderBottomLeftRadius: 104, borderBottomRightRadius: 104, border: '1px black solid'}} />

      <div className="LogIn" style={{left: 221, top: 241, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Literata', fontWeight: '500', letterSpacing: 8, wordWrap: 'break-word'}}>Log In</div>
      <Passwordinput left={89} top={406}/>
      <EmailInput left={137} top={325}/>

      <div className="Register" style={{left: 575, top: 241, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Literata', fontWeight: '500', letterSpacing: 8, wordWrap: 'break-word'}}>Register</div>
      <Passwordinput left={501} top={406} />
      <EmailInput left={549} top={323}/>

      <button className="Signupbutton" style={{width: 168, height: 100, left: 643, top: 526, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontSize: 20, fontFamily: 'Literata', fontWeight: '500', letterSpacing: 4, wordWrap: 'break-word'}}>        
        Sign Up
      </button>
      <button className="Loginbutton" style={{width: 168, height: 100, left: 236, top: 526, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontSize: 20, fontFamily: 'Literata', fontWeight: '500', letterSpacing: 4, wordWrap: 'break-word', textAlign: 'center'}}>
        Log In
      </button>

    </div>
  );
}

export default App;
