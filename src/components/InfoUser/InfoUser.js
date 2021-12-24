import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useHistory,Link } from "react-router-dom";
import './InfoUser.css'
const InfoUser = ({location}) => {


    //console.log("exoume apo info");
    let user_id = localStorage.getItem('id');
    //console.log(user_id);

    let history = useHistory();

    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const [skills, setSkills] = useState(()=>'');
    const [education, setEducation] = useState('')
    const [experience, setExperience] = useState('')
    const [skillsPrivate, setSkillsPrivate] = useState(false);
    const [educationPrivate, setEducationPrivate] = useState(false);
    const [experiencePrivate, setExperiencePrivate] = useState(false);
    const [fromId, setFromId] = useState(user_id);
    const [toId, setToId] = useState(id);
    const [HaveIRequested, setHaveIRequested] = useState(0);
    const [friends, setFriends] = useState(0);
    const [allfriends, setAllFriends] = useState([])
    const [messageInput, setMessageInput] = useState(false)
    const [message, setMessage] = useState('');

    let from_name = localStorage.getItem('name');


    const SendRequest = () => {
        const data = {id:toId};
        axios.post("http://localhost:3001/getuser", data).then((response) => {
            let to_name = response.data[0].name + ' ' + response.data[0].surname;
            const data1 = {fromId: fromId, toId: toId, from_name: from_name, to_name:to_name};
            axios.post("http://localhost:3001/sendrequest", data1).then((response) => {
                 setHaveIRequested(1);
            })
            setHaveIRequested(1);
        })
    }

    const StartConversation = () => {
        const data = {id:toId};
        axios.post("http://localhost:3001/getuser", data).then((response) => {
            let to_name = response.data[0].name + ' ' + response.data[0].surname;
            let to_profile = response.data[0].photo;
            let from_profile = localStorage.getItem('photo');
            const data1 = {user1_id: fromId, user2_id: toId, user1_name: from_name, user2_name: to_name, user1_photo: from_profile, user2_photo: to_profile};
            axios.post("http://localhost:3001/createconv", data1).then((response) => {
                setMessageInput(true);
            })
        })
    }

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
        const data1 = {user1: fromId, user2: toId}
        axios.post("http://localhost:3001/checkiffriends", data1).then((response) => {
            if (response.data.length>0) setFriends(1);
        })
     }, [], [education], [experience])
    
     useEffect(() => {
        const data = {user_id: id};
        axios.post("http://localhost:3001/getfriends", data).then((response)=> {
            setAllFriends(response.data);
         })
     }, [])


     const SendMessage = () => {
        const data = {id:toId};
        axios.post("http://localhost:3001/getuser", data).then((response) => {
            let to_name = response.data[0].name + ' ' + response.data[0].surname;
            const data1 = {from_id: user_id, to_id: toId, from_name: from_name, to_name: to_name, message:message};
            console.log(data1);
            axios.post("http://localhost:3001/sendmessage", data1).then((response) => {  
            })
            setMessage('')
        })
         
    }

    return (
        <div>
            <div id = "FriendOption"> 
                {(() => {
                    if (friends) {
                        return (
                           <h3> <div>YOU ARE FRIENDS WITH THIS USER</div> </h3>
                        )
                    } 
                    else if (HaveIRequested) {
                        return (
                            <h3><div><button>Friend requested has been sended</button></div></h3>
                        )
                    } 
                    else {
                        return (
                            <h3><div><button type = "submit" onClick = {SendRequest}>Send a friend request</button></div> </h3>
                        )
                    }
                })()}
            </div>
            <button id = "messageType" type = "submit" onClick ={StartConversation}> Start a conversation</button>
            {(() => {
                    if (messageInput) {
                        return (
                           <div>  
                               <textarea  id = "message" rows="10" cols="60"  value = { message } name = 'message' 
                                onChange={(event) => {setMessage(event.target.value)}}></textarea> 
                               <button id ="messagebutton"  onClick = {SendMessage} >Send the message</button>
                            </div>
                        )
                    } 
                })()}
            <div className = "information">
            
                {(() => {
                    if (!skillsPrivate) {
                        return (
                           
                           <div>  
                               <div> SKILLS</div>
                                <textarea value = { skills } name = 'skills' id = "skills" rows="10" cols="60" ></textarea> 
                            </div>
                        )
                    } 
                })()}

                {(() => {
                    if (!educationPrivate) {
                        return (
                           <div id = "education1">  
                               <div> EDUCATION</div>
                               <textarea value = { education } name = 'education'  rows="10" cols="60"></textarea> 
                            </div>
                        )
                    } 
                })()}


                {(() => {
                    if (!experiencePrivate) {
                        return (
                           <div  id = "experience1"> 
                               <div> EXPERIENCE</div>
                               <textarea value = { experience } name = 'experience' rows="10" cols="60"></textarea> 
                            </div>
                        )
                    }
                })()}

            </div>

            
                {(() => {
                    if (friends) {
                        return (
                            <div id = "listOfFirends"> 
                                <h3> Friends: </h3>
                                {allfriends.map((val) => { 
                                    if (val.user1== id) {
                                        return (
                                        <div>    
                                           <h4>  <Link className = "friend" to = {'/homepage/network/userinfo?id=' + val.user2} >{val.user2_name}</Link> </h4>
                                        </div>)
                                    }
                                    else {
                                        return (
                                            <div>    
                                              <h4>  <Link className = "friend" to = {'/homepage/network/userinfo?id=' + val.user1} >{val.user1_name}</Link> </h4>
                                            </div>)
                                    }
                                })}
                            </div>
                        )
                    } 
                })()}
            {/* </div> */}
        </div>
    )
}

export default InfoUser








