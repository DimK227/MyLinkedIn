import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Advertisements.css'

function Advertisements() {

    const [myadverisement, setMyadvertisement] = useState("");
    const [advertisements, setAdvertisements] = useState([]);
    const [applications, setApplications] = useState([]);
    const [errorMessage,setErrorMessage] = useState([]);
    const[adname,setAdname] = useState("");

    const user_id = localStorage.getItem('id');

    const Upload_advertisement = () => {
        const data = {author: user_id, skills: myadverisement, name: adname};
        axios.post("http://localhost:3001/uploadadvertisement", data).then((response)=> {
            setMyadvertisement("");
            setAdname("");
        })
    }

    const Apply = (advertisementId,advertisementName,advertisementAuthor) => {
        let id = localStorage.getItem("id");
        const data = {id:id}
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        let resume = "";
        axios.post("http://localhost:3001/getresume", data).then((response)=> {
            resume = 'Education: ' + response.data.education + ',   ' + 'Skills: ' + response.data.skills + ',  ' +  'Experience: ' + response.data.experience;
            const data1 = {advertisement: advertisementId, advertisement_author: advertisementAuthor, advertisement_name: advertisementName, applicant_id: id, applicant_name:name, applicant_email: email, resume: resume }
            axios.post("http://localhost:3001/apply", data1).then((response)=> {
                if (response.data === "Double application") setErrorMessage("You have already applicated for this job");
             })

        })
    }
    

    useEffect(() => {
        const data = {author: user_id};
        axios.post("http://localhost:3001/getadvertisements", data).then((response) => { 
            setAdvertisements(response.data)             
        })

        axios.post("http://localhost:3001/getadvertisementsapps", data).then((response) => {
            setApplications(response.data);
        })
     }, [])


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
            <div className = "adverisements_from_others">
            <h3> <div> These are all advertisements that are suggested to you.</div>
            <div>  Click Apply to apply for the job </div> </h3>
            {advertisements.map((val)=> (
                <div className = "advertisement">
                <div> <h4>Name: {val.name}</h4></div> 
                <div> <h4>Skills Required: {val.skills}</h4></div> 
                <button onClick = {() => Apply(val.id,val.name,val.author)}>Apply</button>
            </div>
            ))}
            {errorMessage}
            </div>

            <div className = "my_adverisements">
                <input id = "ad_name" type='text' value = {adname} name='ad_name' placeholder='Name your work advertisement' onChange={(event) => {setAdname(event.target.value)}}/>
                <textarea name = 'myadvertisement' value = {myadverisement} id = "myadvertisement" placeholder = "Type the skills required for your work advertisement (use only spaces to seperate the different skills)" rows="10" cols="60" onChange={(event) => {setMyadvertisement(event.target.value)}}></textarea>
                <button id = "advertisement_button" onClick = {Upload_advertisement}>Upload the advertisement</button>
            </div>

            <div className = "Applications">
            <h3> <div> Applications for your advertisements.</div> </h3>
                
                {applications.map((val)=> (
                    <div>
                    <div> <h4>Name: {val.applicant_name}</h4></div> 
                    <div><h4>Email: {val.applicant_email}</h4></div>
                    <div><h4>Resume: {val.resume}</h4> </div>
                    <div><h4>Advertisement name: {val.advertisement_name}</h4> </div>
                    <br></br>
                    </div>
                ))}
                

            </div>
        </div>
    )
}

export default Advertisements;