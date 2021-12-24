import React, { useState, useEffect } from 'react'
import Post from "../Post/Post"
import axios from "axios"
import "./Comment.css"


function Comment({location}) {


    const [writer, setWriter] = useState('');
    const [writerId, setWriterId] = useState(0);
    const [body, setBody] = useState([]);
    const [likes, setLikes] = useState([]);
    const [input, setInput] = useState('')
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);

    const params = new URLSearchParams(location.search);
    const postId = params.get('postid');

    const name = localStorage.getItem('name');
    const from_id = localStorage.getItem('id');

    useEffect(() => {
        const data = {postId: postId};
        axios.post("://localhost:3001/getpost", data).then((response) => {
            setWriter(response.data[0].writer);
            setWriterId(response.data[0].writer_id);
            setBody(response.data[0].body);
            setLikes(response.data[0].likes);
            setPost(response.data);
        })
    },[])

    useEffect(() => {
        const data = {postId: postId};
        axios.post("http://localhost:3001/getcomments", data).then((response) => {
        setComments(response.data);
        })
    })

    const addComment = (event) => {
        event.preventDefault();
        const data = {from_id:from_id, writer: name, to_id: writerId, to_name: writer, input: input, postId: postId, post_body:body}

        axios.post("http://localhost:3001/sendcomment", data).then((response)=> {
        })
        setInput(""); 
    }
    
    return (
        <div>
            {post.map((val)=> (
            <Post name = {val.writer} message = {val.body} id = {val.id} likes ={val.likes} profile = {val.writer_profile} post_image = {val.post_image} post_video = {val.post_video} post_audio = {val.post_audio}/>
            ))}
            <div className="Comments">
                <div className='addCommentContainer'>
                <input value = { input } name = 'input' placeholder = "Comment" type="text" onChange={(event) => {setInput(event.target.value)}}/>
                    <button onClick = {addComment}>Add Comment</button>
                
                </div>
                <div className = "listOfComments">
                    {comments.map((val)=> {

                        // return <Post name = {val.writer} message = {val.commentBody} id = {val.id}/>
                        // return <NewComment name = {val.writer} message = {val.commentBody}/>
                        return (
                            <div className="comment">
                                 
                                {val.writer}
                                {": " }
                                {val.commentBody}
                                
                            </div>)
                    })}
                </div>

            </div>
        </div>
    )
}

export default Comment
