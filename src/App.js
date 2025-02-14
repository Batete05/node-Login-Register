import React,{useState} from "react";
import './App.css'
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import RegistrationForm from './components/RegistrationForm/Registration'
import PrivateRoute from './utils/PrivateRoute'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import AlertComponent from './components/AlertComponent/AlertComponent'

function App(){
  const [title, updateTitle]= useState(null);
  const [errorMessage, updateErrorMessage]=useState(null);

  return(
    <Router>
      <div className="App">
        <Header title={title} />
        <div className="container d-flex align items-center flex-column">
          <switch>
            <Route path="/" exact={true}>
            <RegistrationForm showError={updateErrorMessage}  updateTitle={updateTitle} />
            </Route>
            <Route path="/register">
            <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
            <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/home">
            <Home/>
            </PrivateRoute>
          </switch>
        </div>
      </div>
    </Router>
  )
}

export default App;