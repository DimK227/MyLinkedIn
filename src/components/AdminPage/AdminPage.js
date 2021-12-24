import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import axios from "axios"
import "./AdminPage.css"


function AdminPage() {
    let i = false;

    const [users, setUsers] = useState([])
    const [downloads, setDownloads] = useState([])

    useEffect(() => {
        axios.post("http://localhost:3001/allusers").then((response) => {
            setUsers(response.data);
        })
    },[])

    if (window.performance) {
        if (performance.navigation.type == 1) {
            i = true;
        } 
      }


    let history = useHistory();


   const logout = () => {
       history.push('/',true);        
    }

    const Export = () => {

    }


    const DownloadUser = (id) => {
      let download_data = {
          name : "",
          surname: "",
          email: "",
          resume: "",
          articles: [],
          friends: [],
          advertisements: []
      }
      axios.post("https://localhost:3001/getuser", {id:id}).then((response) => {
            download_data.name = response.data[0].name;
            download_data.surname = response.data[0].surname;
            download_data.email = response.data[0].email;
            axios.post("https://localhost:3001/getresume", {id:id}).then((response)=> {
                let resume = 'Education: ' + response.data.education + ',   ' + 'Skills: ' + response.data.skills + ',  ' +  'Experience: ' + response.data.experience;
                download_data.resume = resume;
                axios.get("https://localhost:3001/getposts").then((response) => {
                  for (var i = 0; i<response.data.length; i++) {
                    if (response.data[i].writer_id == id) {
                      let post = {
                        id: 0,
                        body: ""
                      }
                      post.id = response.data[i].id;
                      post.body = response.data[i].body;
                      download_data.articles.push(post)
                    }
                    
                  }
                  axios.post("https://localhost:3001/getfriends", {user_id:id}).then((response) => {
                      for (var i = 0; i< response.data.length; i++ ) {
                        if (response.data[i].user1 == id) {
                          download_data.friends.push(response.data[i].user2_name)
                        }
                        else {
                          download_data.friends.push(response.data[i].user1_name)
                        }
                      }
                      axios.post("https://localhost:3001/getadvertisements", {author: -1}).then((response) => {
                          for (var i = 0; i<response.data.length; i++) {
                            if (response.data[i].author == id) {
                              let adv = {
                                id: 0,
                                name: "",
                                skills: ""
                              }
                              adv.id = response.data[i].id;
                              adv.name = response.data[i].name;
                              adv.skills = response.data[i].skills;
                              download_data.advertisements.push(adv)
                            }
                            
                          }
                          setDownloads([...downloads, download_data]);
                      })
                  })
                  
                })
                
            })
            
      })
      


    }

    if (!window.admin && !i) {
         return <Redirect to= "/login" />;
    }

    
    
    return (
      
    <div>
      <h3> Click the users you want to get their data</h3>
        {users.map((val)=> (
         <div>
            <h3 onClick = {() => DownloadUser(val.id)} id ="user">{val.name + " " + val.surname}</h3> 
         </div>   
        ))}
        <div>
            <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify([downloads])
            )}`}
            download="Data.json"
            >
            {`Download Json`}
          </a>
      </div>

      <div>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify([downloads])
            )}`}
            download="Data.xml"
            >
            {`Download XML`}
          </a>
      </div>
        <button id="logout" onClick ={ logout}>Logout</button>
    </div>
    );
}

export default AdminPage