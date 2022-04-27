import React from 'react';
import { useEffect, useState } from 'react';
import "../../imported-styles/SideBar.scss";
import './App.css'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard';
import { Switch, Route, Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import UserPhoneService from '../../services/usersService'
import ProtectedRoute from '../ProtectedRout/ProtectedRoute';

function App() {
  const [userData, setUserData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitedSuccesfuly, setIsSubmitedSuccesfuly] = useState(false);
  const history = useHistory();

  function handleSubmitLogin(phoneNumber) {
    try{
      setUserData(UserPhoneService.signin(phoneNumber));
      setIsLoggedIn(true);
      setIsSubmitedSuccesfuly(true);
      history.push('/');

    } catch (err) {
      console.log(err.message);
    } finally {
      setTimeout(() => {
        setIsSubmitedSuccesfuly(false);
      }, "1000")
    }
    // add  here api call + history push to the wanted route
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <>
      <Switch>
        <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn} >
          <Dashboard/>
        </ProtectedRoute>
        <Route path={'/login'}>
          {
            isLoggedIn ?
            <Redirect to="/" /> :
            <Login handleSubmitLogin={handleSubmitLogin} isSubmitedSuccesfuly={isSubmitedSuccesfuly}/>
          }
        </Route>
      </Switch>
    </>
  );
}

export default App;