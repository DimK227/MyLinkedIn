import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";

function Settings() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [new_email, setNew_Email] = useState("");
    const [new_password, setNew_Password] = useState("");

    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");

    const [confirm, setConfirm] = useState("");

    let history = useHistory();

    const change = () => {
        const data = { email: email, password: password, new_email: new_email, new_password: new_password};
        const data2 = {email: email, password: password}
        const data3 = {email: new_email, password: new_password}
        axios.post("http://localhost:3001/users", data3).then((response1)=> {
            if (response1.data.length > 0) setError2("There is already a user with this email");
            else {
                axios.post("http://localhost:3001/change", data).then((response)=> {
                    setConfirm("YOUR CREDENTIALS CHANGED");
                })
            }
        })
    }



    return (
        <div>
            <div class="navbar2">
                        <a href = "/homepage" id = "homepage" >Homepage</a>
                        <a href = "/homepage/network" id = "network" >Network</a>
                        <a href = "/homepage/advertisements" id = "advertisements" >Advertisements</a>
                        <a href = "/homepage/messenger" id = "messenger" >Messenger</a>
                        <a href = "/homepage/notifications" id = "notifications" >Notifications</a>
                        <a href = "/homepage/personal_info" id = "personal_info">Personal information</a>
                        <a href = "/homepage/settings" id = "settings" >Settings</a>   
                    </div>
            <div className = "form">       
                <input id = 'email' type='email' name='email' onChange={(event) => {setEmail(event.target.value)}} placeholder='email'/>
                <input id = 'email' type='email' name='new_email' onChange={(event) => {setNew_Email(event.target.value)}} placeholder='new email'/>
                <input id = "password" type = 'password' name = 'new_password' onChange={(event) => {setNew_Password(event.target.value)}} placeholder = 'new password'/>
                <button onClick = {change}>Change</button>
            </div>
            <h3>{error1}</h3>
            <h3>{error2}</h3>
            <h3>{confirm}</h3>
        </div>
    )
}

export default Settings;