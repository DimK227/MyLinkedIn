
import React, { useState, useEffect } from 'react'
import "./Center.css"
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Post from "../Post/Post"
import axios from 'axios';
import { CodeSharp } from '@material-ui/icons';

function Center() {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
    const [photo, setPhoto] = useState('');
    const [video, setVideo] = useState('');
    const [audio, setAudio] = useState('');
    const [video2, setVideo2] = useState('');
    const [friends, setFriends] = useState([])
    

    const user_id = localStorage.getItem('id');
    let formData = {};
    let config = {};

    const uploadImage = async(type, e) => {
        const file = e.target.files[0];
        if (type === "video") {
        

        var newObject  = {
            'name'             : file.name,
            'lastModified'     : file.lastModified,
            'lastModifiedDate' : file.lastModifiedDate,
            'size'             : file.size,
            'type'             : file.type,
            'webkitRelativePath': file.webkitRelativePath
         };  
          
        let str =  JSON.stringify(newObject);
         setVideo2(str);

        }
        else {
            const base64 = await convertBase64(file);
            setPhoto(base64);
        }
    }

    const uploadVideo = async(files) => {
        const base64 = await convertBase64(files[0]);
        setVideo(base64);
        console.log(files[0])
        const formData2 = new FormData()
        formData2.append('video', files[0])
        const config2 = {
            headers:{
                'content-type': 'multipart/from-data'
            }
        }
        axios.post('http://localhost:3001/uploadVideo', formData2, config2).then((response) => {
            localStorage.setItem('video',response.data)
            setVideo(response.data);
        })
        
    }

    

    const uploadAudio = async(files) => {
        const base64 = await convertBase64(files[0]);
        setAudio(base64);
        const formData2 = new FormData()
        formData2.append('audio', files[0])
        const config2 = {
            headers:{
                'content-type': 'multipart/from-data'
            }
        }
        axios.post('://localhost:3001/uploadAudio', formData2, config2).then((response) => {
            localStorage.setItem('audio',response.data)
            setAudio(response.data);
        })
        
    }

    const sendPost = (event) => {
        event.preventDefault();
        var audio1 = localStorage.getItem('audio');
        var video1 = localStorage.getItem('video')
        const data = {writer_id:id, writer: name, input: input, post_image: photo, post_video:video1, post_audio: audio1,writer_profile:profile}
        axios.post("http://localhost:3001/sendpost", data).then((response)=> {
        })
        setInput("");
        setVideo("");
        setPhoto("");
        setAudio("")
        localStorage.setItem('audio',"");
        localStorage.setItem('video',"");
    }

    
useEffect(() => {
    axios.get("http://localhost:3001/getposts").then((response) => {
        setPosts(response.data)            
    })
},[])


const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
} 



  let profile = localStorage.getItem('photo');

    let name = localStorage.getItem('name');
    let id = localStorage.getItem('id');

    
    


    return (
        <div className="center">
            <div className = "input_container" >
                
                <form>
                    <input value = { input } name = 'input' className = "post_input" placeholder = "Start a post" type="text" onChange={(event) => {setInput(event.target.value)}}/>
                    <input type = "file" name = "image" id = "image" accept="image/*" onChange={(e) => { uploadImage("image",e) }} ></input>
                    <input type = "file" name = "video" id = "video" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { uploadVideo(e.target.files) }} ></input>
                    <input type = "file" name = "audio" id = "audio" accept="audio/mp3,audio/*;capture=microphone" onChange={(e) => { uploadAudio(e.target.files) }} ></input>
                    <img src = {photo} height ="100"></img>
                    {(() => {
                        if (video.length>0) {
                            return (
                                <div>
                                    <video width="750" height="500" controls >
                                        <source src={video}/>
                                    </video>
                                </div>
                            )
                         } 
                    })()} 

                    {(() => {
                        if (audio.length>0) {
                            return (
                                <div>
                                    <audio src={audio} controls/>
                                </div>
                            )
                         } 
                    })()} 

                    
                    <button onClick = {sendPost} type='submit' id = "submit">Send</button>
                </form>
                <div className="post_options">
                <label for="image">
                    <ImageIcon/>
                </label>
                    Photo    
                    <label for="video">
                        <VideoLibraryIcon/>
                    </label>    
                    Video
                    <label for="audio">
                        <RecordVoiceOverIcon/>
                    </label>
                    Audio
                </div>
                
            </div>
            {posts.map((val)=> (
            <Post writer_id = {val.writer_id} name = {val.writer} message = {val.body} id = {val.id} likes ={val.likes} profile = {val.writer_profile} post_image = {val.post_image} post_video = {val.post_video} post_audio = {val.post_audio} />
            ))}
        </div>
    )
}

export default Center


