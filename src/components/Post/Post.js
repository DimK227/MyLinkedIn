import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./Post.css"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from "axios";
import Comment from "../Comment/Comment"
import { useLocation, BrowserRouter, BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";

function Post({ writer_id, name, description, message, id, likes, profile, post_image, post_video, post_audio}) {

     let history = useHistory();
     const location = useLocation();
     const path = location.pathname;
     let f = false;

     if (path === "/homepage") {
         f = true;
     }

    const [haveILiked, setHaveILiked] = useState(false)

    const like = () => {
        let user_id = localStorage.getItem('id');
        let user_name = localStorage.getItem('name');
        setHaveILiked(!haveILiked);
        const data = {userLiking: user_id, from_name: user_name, to_id: writer_id, to_name: name, postId: id, post_body: message}
        axios.post("http://localhost:3001/like", data).then((response) => {
        })
        
    }

    useEffect(() => {
        let user_id = localStorage.getItem('id');
        
        const data = {user_id: user_id, postId:id}
        axios.post("http://localhost:3001/checkiflike", data).then((response) => {
            if (response.data.length!=0) {
                setHaveILiked(true);
            }
            else {
                setHaveILiked(false);
            }
        })
    })

    return (
        <div>
        <div className = "post">
            <div className = "post_header">
                {(() => {
                    if (profile.length>0) {
                        return (
                            <div>
                                <img src ={profile} height ="30"></img>
                            </div>
                        )
                    } 
                    else {
                        return (
                            <Avatar />
                        )      
                    }
                })()} 
                <div className="post_info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post_body">
                <img id = {f ? "comment_image" : "post_image"} src ={post_image} height ="80"></img>
                <p>{message}</p>
                {(() => {
                    if (post_video.length) {
                        return (
                            <video width="750" height="500" controls >
                                <source src={"Videos/" + post_video}/>
                            </video>
                        )
                    } 
                })()} 
                {(() => {
                    if (post_audio.length) {
                        return (
                            <audio src={"Audio/" + post_audio} controls/>
                        )
                    } 
                })()} 
                
            </div>
            <h2> <div id = "number_of_likes">{likes}</div> </h2>
            <div className = "post_buttons">
                <ThumbUpAltIcon onClick = {like} id = {haveILiked ? "UnlikeButton" : "LikeButton"}/>
                <Router>
                <h4> <a href = {'/homepage/comments?postid=' + id} id = "comments" >comments</a></h4> 
                </Router>
            </div>
        </div>
        </div>
    )
}

export default Post


