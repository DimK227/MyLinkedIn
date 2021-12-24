import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {withRouter,useHistory} from "react-router-dom"
import axios from "axios";
import "./Personal_Info.css"

// let s = "p";




function Personal_Info({id: id, ...rest}) {

    id = localStorage.getItem('id');
    const [skills, setSkills] = useState(()=>'');
    const [education, setEducation] = useState('')
    const [experience, setExperience] = useState('')
    const [skillsPrivate, setSkillsPrivate] = useState(false);
    const [educationPrivate, setEducationPrivate] = useState(false);
    const [experiencePrivate, setExperiencePrivate] = useState(false);
        

    useEffect(() => {
        const user_id = id;
        const data = {user_id: user_id};
        axios.post("http://localhost:3001/getinfo", data).then((response) => {
            if (response.data.length!=0) {
            setSkills(response.data[0].skills);
            if (response.data[0].SkillsPrivate === "YES") setSkillsPrivate(true);
            setEducation(response.data[0].education);
            if (response.data[0].EducationPrivate === "YES") setEducationPrivate(true);
            setExperience(response.data[0].experience);
            if (response.data[0].ExperiencePrivate === "YES") setExperiencePrivate(true);
            }
        })
     }, [], [education], [experience])

    const sendInfo = (event) => {
        event.preventDefault();
        const data = {skills: skills, education: education, experience: experience, user_id: id}
        axios.post("http://localhost:3001/sendinfo", data).then((response)=> {
        })
    }

    const ChangePrivacyStatus = (isPrivate, info) => {
        if (info === "skills") setSkillsPrivate(!skillsPrivate);
        else if (info === "education") setEducationPrivate(!educationPrivate);
        else setExperiencePrivate(!experiencePrivate);
        const data = {user_id: id, info:info, isPrivate: isPrivate}
        axios.post("http://localhost:3001/changeprivacystatus", data).then((response)=> {
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
            <textarea value = { skills } name = 'skills' id = "skills" placeholder = "type your skills" rows="10" cols="60" onChange={(event) => {setSkills(event.target.value)}}></textarea>
            {(() => {
                if (skillsPrivate) {
                    return (
                         <button  id = "skills_btn" type='submit' onClick = {() => ChangePrivacyStatus("NO", "skills")}>Make skills non-private</button>
                    )
                } 
                else {
                    return (
                        <button  id = "skills_btn" type='submit' onClick = {() => ChangePrivacyStatus("YES", "skills")}>Make skills private</button>
                    )
                }
            })()}
            <textarea value = { education } name = 'education' id = "education"  placeholder = "type your education" rows="10" cols="60" onChange={(event) => {setEducation(event.target.value)}}></textarea>
            {(() => {
                if (educationPrivate) {
                    return (
                        <button id = "education_btn" type='submit' onClick = {() => ChangePrivacyStatus("NO", "education")}>Make education non-private</button>
                    )
                } 
                else {
                    return (
                        <button id = "education_btn" type='submit' onClick = {() => ChangePrivacyStatus("YES", "education")}>Make education private</button>
                    )
                }
            })()}
            <textarea value = { experience } name = 'experience' id = "experience" placeholder = "type your experience" rows="10" cols="60" onChange={(event) => {setExperience(event.target.value)}}></textarea>
            {(() => {
                if (experiencePrivate) {
                    return (
                        <button id = "experience_btn" type='submit' onClick = {() => ChangePrivacyStatus("NO", "experience")}>Make experience non-private</button>
                    )
                } 
                else {
                    return (
                        <button id = "experience_btn" type='submit' onClick = {() => ChangePrivacyStatus("YES", "experience")}>Make experience private</button>
                    )
                }
            })()}
            <textarea value = { id } name = 'id' id = "id" placeholder = "type your experience" rows="10" cols="60"></textarea>
            <button id = "info_btn" onClick = {sendInfo} type='submit'>Submit your info</button>
        </div>
    )
}

export default Personal_Info;

