import React,{useState} from "react";
import axios from "axios";
import './Registration.css'
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'

function RegistrationForm(props){
    const[state, setState]= useState({
        email:"",
        password:"",
        confirmPassword:"",
        userName:"",
        successMessage:null
    })
    const handleChange=(e)=>{
        const {id,value}=e.target
        setState(prevState=>({
            ...prevState,
            [id]:value
        }))
    }
    const sendDetailsToServer=()=>{
        if(state.email.length&& state.password.length){
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
                "name":state.userName
            }
            axios.post(API_BASE_URL+'/user/register',payload).then(function(response){
                if(response.status===200){
                    setState(prevState=>({
                        ...prevState,
                        'successMessage':'Registartion successful. Redirecting to Home page...'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    redirectToHome();
                    props.showError(null)
                }
                else{
                    props.showError("Some error happeneded");
                }
            })
            .catch(function(error){
                console.log(error)
            })
            }
            else{
                props.showError('Please enter valid username or password')
            }
        }
        const redirectToHome=()=>{
            props.updateTitle('Home')
            props.history.push('/home')
        }

        const redirectToLogin=()=>{
            props.updateTitle('Login')
            props.history.push('/login')
        }

        const handleSubmitClick=(e)=>{
            e.preventDefault();
            if(state.password===state.confirmPassword){
                sendDetailsToServer()
            }
            else{
                props.showError('Passwords do not match');
            }
        }
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <div className="form-group text-left">
                            <label htmlFor="exampleInputPassword1">User Name</label>
                            <input type="text"
                            className="form-control"
                            id="username"
                            placeholder="Add User Name"
                            value={state.userName}
                            onChange={handleChange}
                            />
                        </div>
                        <label htmlFor="exampleInputEmail">Email</label>
                        <input type="text"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}   
                        />        
                        <small id="emailHelp" className="form-text text-muted">We will never share your email with any one.</small>  
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                        />
                    </div>
                    <button 
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
                </form>
                <div className="alert alert-success mt-2" style={{display: state.successMessage? 'block'  :'none'}} role="alert">
                    {state.successMessage}
                </div>
                <div className="mt-2">
                    <span>ALready have an account?</span>
                    <span className="LoginText" onClick={()=>redirectToLogin()}>Login here</span>
                </div>
            </div>
        )
    }

export default withRouter(RegistrationForm)