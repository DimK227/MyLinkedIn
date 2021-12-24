import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import ProtectedRoute from '../ProtectedRoute';
import { ContactSupportOutlined } from '@material-ui/icons';
import "./Login.css"




function Login()  {
    const[isAuth, setIsAuth] = useState(false);   

    const [loginStatus, setLoginStatus] = useState("");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();

    axios.defaults.withCredentials = true;

     const login = () => {
        if (email === "admin@admin.com") {
            window.admin = true;
            history.push('/admin',true);
        }
        else {
            const data = { email: email, password: password};
            axios.post("http://localhost:3001/login", data).then((response)=> {
                if (response.data.id) {
                    //else {
                        let id = response.data.id;
                        let email = response.data.email;
                        let name = response.data.name + ' ' + response.data.surname;
                        let photo = response.data.photo;
                        history.push({
                            pathname: '/homepage',
                            state: {id: id, email:email, name: name, photo:photo,  from: "login"}
                            
                        })
                    //}
                    
                }
                else {
                    setError("There is no user with this email or your password is wrong");

                }
            })
        }
    }

        return (
            <div className = "login">
                <div className = "form">
                        <input id = 'email' type='email' name='email' onChange={(event) => {setEmail(event.target.value)}} placeholder='email'/>
                        <input id = 'password' type = 'password' name = 'password' onChange={(event) => {setPassword(event.target.value)}} placeholder = 'password'/>
                </div>
                <div className = "login_button">
                    <button id = "login_button" type = "submit" onClick={login}>Log In</button>
                </div>
               
                <div className = "error">
                 <h1> {error}</h1>   
                </div>
            </div>
        );
}

export default Login;