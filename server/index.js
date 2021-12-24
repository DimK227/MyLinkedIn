const express = require('express');
const app = express();
const mysql = require('mysql');
const https = require('https');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const socket = require('socket.io');
const bcrypt = require('bcrypt')

const bodyParser = require('body-parser');
const { continueStatement } = require('@babel/types');
var file_name = "";
var file_name2 = "";
const saltRounds = 10;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json({limit: '500mb'}))
app.use(express.urlencoded({limit: '500mb'}));



app.listen(3001, ()=> {
    console.log("perfect")
})


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    // database: "linkedin",
});


db.connect(function(err) {

    db.query("CREATE DATABASE linkedin", function (err, result) {
        //if (err) console.log(err);
        console.log("Database created");
      });

    var sql = "CREATE TABLE linkedin.advertisements (id INT NOT NULL AUTO_INCREMENT, author VARCHAR(45) NOT NULL, name VARCHAR(45) NOT NULL, skills TEXT NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci" 
    db.query(sql, function (err, result) {
    });

    sql = "CREATE TABLE linkedin.advertisements_applications (id INT NOT NULL AUTO_INCREMENT, advertisement int NOT NULL,advertisement_author int NOT NULL,advertisement_name varchar(45) NOT NULL, applicant_id int NOT NULL, applicant_name varchar(45) NOT NULL,applicant_email varchar(45) NOT NULL,resume text NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.comments ( id int NOT NULL AUTO_INCREMENT, postId int NOT NULL, writerId int NOT NULL, writer varchar(45) NOT NULL, commentBody text NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.conversations (id int NOT NULL AUTO_INCREMENT,user1_id int NOT NULL,user2_id int NOT NULL,user1_name varchar(100) NOT NULL,user2_name varchar(100) NOT NULL,user1_photo mediumtext NOT NULL,user2_photo mediumtext NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.friend_requests (id int NOT NULL AUTO_INCREMENT,fromId int NOT NULL,toId int NOT NULL,from_name varchar(45) NOT NULL,to_name varchar(45) NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.friendships (id int NOT NULL AUTO_INCREMENT,user1 int NOT NULL,user2 int NOT NULL,user1_name varchar(100) NOT NULL,user2_name varchar(100) NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.information (id int NOT NULL AUTO_INCREMENT,skills text,SkillsPrivate varchar(45) NOT NULL,education text,EducationPrivate varchar(45) NOT NULL, experience text,ExperiencePrivate varchar(45) NOT NULL,user_id int NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.likes (userLiking int NOT NULL,postId int NOT NULL,PRIMARY KEY (userLiking,postId)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.messages (id int NOT NULL AUTO_INCREMENT,from_id int NOT NULL,to_id int NOT NULL,from_name varchar(100) NOT NULL,to_name varchar(100) NOT NULL,message varchar(10000) NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.notifications (id int NOT NULL AUTO_INCREMENT,from_id int NOT NULL,to_id int NOT NULL,from_name varchar(100) NOT NULL,to_name varchar(100) NOT NULL,post int NOT NULL,post_body varchar(1000) NOT NULL,type varchar(20) NOT NULL,comment varchar(1000) DEFAULT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.posts (id int NOT NULL AUTO_INCREMENT,writer_id int NOT NULL,writer varchar(45) NOT NULL,body mediumtext NOT NULL,post_image mediumtext,post_video mediumtext,post_audio mediumtext,likes int DEFAULT '0',writer_profile mediumtext NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.shown_advertisements (advertisement int NOT NULL,shown_to int NOT NULL,PRIMARY KEY (shown_to,advertisement)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.shown_posts (post int NOT NULL,shown_to int NOT NULL,PRIMARY KEY (post,shown_to))  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
    sql = "CREATE TABLE linkedin.users (id int NOT NULL AUTO_INCREMENT,name text NOT NULL,surname text NOT NULL,email varchar(45) NOT NULL,password varchar(500) NOT NULL,photo mediumtext NOT NULL,PRIMARY KEY (id,email)) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    db.query(sql, function (err, result) {
    });
  });


 

const storage = multer.diskStorage({
    
    destination: '../public/Videos',
    filename: (req, file, cb) => {
        let name = "VIDEO-" + Date.now() + path.extname(file.originalname)
        cb(null, name)
        
        file_name = name;
    }
})

const upload = multer({
    storage: storage
}).single('video')


app.post('/uploadVideo', upload, (req,res) => {
    console.log(file_name)
    res.send(file_name);
})


const storage2 = multer.diskStorage({
    
    destination: '../public/Audio',
    filename: (req, file, cb) => {
        let name = "AUDIO-" + Date.now() + path.extname(file.originalname)
        cb(null, name)
        file_name2 = name;
    }
})

const upload2 = multer({
    storage: storage2
}).single('audio')


app.post('/uploadAudio', upload2, (req,res) => {
    res.send(file_name2);
})


app.post('/create', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const photo = req.body.photo;
    db.query('SELECT * FROM linkedin.users WHERE email =  ?', email, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
           if (result.length == 0) {
               bcrypt.hash(password, saltRounds, (err,hash)=> {
                db.query('INSERT INTO linkedin.users (name,surname,email,password,photo) VALUES (?,?,?,?,?)', [name,surname,email,hash,photo], (err2, result2) => {
                    if (err2) {
                    }
                     else {
                        res.send("Values Inserted");
                    }
                 });
               })
                
            }
            else res.send("Double email");
        }
    });

    
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let found = true;
    db.query('SELECT id,password, email, name, surname, photo FROM linkedin.users WHERE email = ?', [email], (err, result) => {
        if (err) {
            found = false;
        }
        else {
            if (result.length != 0) {
                found = true;
            }
            else found = false;
            
        }
        if (!found) res.json({ error: "User Doesn't Exist"});
         else{
             bcrypt.compare(password, result[0].password, (error, result1) => {
                 if (result1) {
                    res.json(result[0]);
                 }
                 else {
                    res.json([]);
                 }
             })
        }
    });
});

app.post("/change", async (req, res) => {
    const { email, password, new_email, new_password } = req.body;
    bcrypt.hash(new_password, saltRounds, (err,hash)=> {
        db.query('UPDATE linkedin.users SET password = ?, email = ? WHERE email = ?', [hash,new_email,email], (err, result) => {
            if (err) {
            }
            else {
                res.json("DATA CHANGED!!");
            }
    
        });
    })
    
})




app.post("/users", async (req, res) => {
    const { email,password } = req.body
    db.query("SELECT email, password FROM linkedin.users WHERE email = ?", [email], (err, result) => {
        if (err){
        }
        else {
            res.send(result);
        }
    })
})

app.post("/getuser", async (req, res) => {
    db.query("SELECT * FROM linkedin.users WHERE id = ?", [req.body.id], (err, result) => {
        if (err){
        }
        else {
            res.send(result);
        }
    })
})


app.post("/allusers", async (req, res) => {
    db.query("SELECT * FROM linkedin.users", (err, result) => {
        if (err){
        }
        else {
            res.send(result);
        }
    })
})


app.post("/sendpost", async (req, res) => {
    const writer_id = req.body.writer_id;
    const writer = req.body.writer;
    const body = req.body.input;
    const post_image = req.body.post_image;
    const post_video = req.body.post_video;
    const post_audio = req.body.post_audio;
    const writer_profile = req.body.writer_profile;
    db.query('INSERT INTO linkedin.posts (writer_id,writer,body,post_image, post_video, post_audio, writer_profile) VALUES (?,?,?,?,?,?,?)', [writer_id,writer,body,post_image,post_video,post_audio,writer_profile], (err, result) => {
        if (err) {
        }
        else {
             res.send("Post Inserted");
            
        }
    });
})

app.post("/sendinfo", async (req, res) => {
    const skills = req.body.skills;
    const education = req.body.education;
    const experience = req.body.experience;
    const user_id = req.body.user_id;
    const SkillsPrivate = "NO";
    const EducationPrivate = "NO";
    const ExperiencePrivate = "NO";
    db.query('DELETE FROM linkedin.information WHERE user_id = ?', [user_id], (err, result) => {
        if (err) {
        }
        else {
            db.query('INSERT INTO linkedin.information (skills,SkillsPrivate,education,EducationPrivate,experience,ExperiencePrivate,user_id) VALUES (?,?,?,?,?,?,?)', [skills,SkillsPrivate,education,EducationPrivate,experience,ExperiencePrivate,user_id], (err, result) => {
                if (err) {
                }
                else {
                    res.send("Info Inserted");
                }
            });
        }
    });
    
})


app.post("/changeprivacystatus", async (req,res) => {
    const user_id = req.body.user_id;
    if (req.body.info === "skills") {
        const SkillsPrivate = req.body.isPrivate;
        db.query("UPDATE linkedin.information SET SkillsPrivate = ? WHERE user_id = ?", [SkillsPrivate, user_id], (err,result) => {
        });
    }
    else if (req.body.info === "education") {
        const EducationPrivate = req.body.isPrivate;
        db.query("UPDATE linkedin.information SET EducationPrivate = ? WHERE user_id = ?", [EducationPrivate, user_id], (err,result) => {
        });
    }
    else if (req.body.info === "experience") {
        const ExperiencePrivate = req.body.isPrivate;
        db.query("UPDATE linkedin.information SET ExperiencePrivate = ? WHERE user_id = ?", [ExperiencePrivate, user_id], (err,result) => {
        });
    }
    

    
})

app.post("/getinfo", async (req,res) => {
    id = req.body.user_id;
    db.query("SELECT * FROM linkedin.information WHERE user_id = ? ORDER BY id DESC", [id], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.get("/getposts", (req,res) => {
    db.query("SELECT * FROM linkedin.posts", (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/getshownposts", (req,res) => {
    db.query("SELECT * FROM linkedin.shown_posts WHERE post = ? AND shown_to = ?",[req.body.post, req.body.shown_to], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})

app.post("/getpost", (req,res) => {
    const id = req.body.postId;
    db.query("SELECT * FROM linkedin.posts WHERE id = ?",id, (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/insertshownpost", async (req, res) => {
    db.query("SELECT * FROM linkedin.shown_posts WHERE post = ? AND shown_to = ?", [req.body.post,req.body.shown_to], (err1, result1) => {
        if (err1) {
        }
        else {
           if (result1.length == 0) {
                db.query('INSERT INTO linkedin.shown_posts (post,shown_to) VALUES (?,?)', [req.body.post,req.body.shown_to], (err, result) => {
                    if (err) {
                     }
                    else {
                    }
                });
           }
           else {
               res.send(result1);
           }
        }
    })
    
})

app.post("/search", (req,res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    db.query("SELECT * FROM linkedin.users WHERE name = ? AND surname = ?", [name,surname], (err, result) => {
        if (err) {}
        else {
            res.send(result);
        }
    })
})


app.post("/sendrequest", (req,res) => {
    const fromId = req.body.fromId;
    const toId = req.body.toId;
    const from_name = req.body.from_name;
    const to_name = req.body.to_name;
    db.query('INSERT INTO linkedin.friend_requests (fromId,toId,from_name,to_name) VALUES (?,?,?,?)', [fromId,toId,from_name,to_name], (err, result) => {
        if (err) {
        }
        else {
            res.send("Friend Request Inserted");
            
        }
    });
})


app.post("/getrequests", (req,res) => {
    const user_id = req.body.user_id;
    db.query('SELECT * FROM linkedin.friend_requests WHERE toId = ?', [user_id], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    });
})


app.post("/rejectrequest", (req, res) => {
    const fromId = req.body.fromId;
    const toId = req.body.toId;
    db.query('DELETE FROM linkedin.friend_requests WHERE fromID = ? AND toId = ?', [fromId,toId], (err, result) => {
        if (err) {
        }
        else {
            res.send("Friend Request Deleted");
        }
    });
})

app.post("/acceptrequest", (req, res) => {
    const fromId = req.body.fromId;
    const toId = req.body.toId;
    const user1_name = req.body.from_name;
    const user2_name = req.body.to_name;
    db.query('DELETE FROM linkedin.friend_requests WHERE fromID = ? AND toId = ?', [fromId,toId], (err, result) => {
        if (err) {
        }
        else {
        }
    });

    db.query('INSERT INTO linkedin.friendships (user1,user2,user1_name, user2_name) VALUES (?,?,?,?)', [fromId,toId,user1_name, user2_name], (err, result) => {
        if (err) {
        }
        else {
            res.send("Friendship Inserted");
            
        }
    });

})


app.post("/getfriends", (req,res) => {
    db.query("SELECT * FROM linkedin.friendships WHERE user1 = ? OR user2 = ?",[req.body.user_id,req.body.user_id], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/handlerequest", (req, res) => {
    const result = req.body.result;
    const fromId = req.body.fromId;
    const toId = req.body.toId;
    if (result === "accept") {
        db.query("SELECT linkedin.friends FROM users WHERE id = ?", [fromId], (err, result) => {
            if (err) {
            }
            else {
                res.send(result);
            }
        })
    }
    else {

    }
})


app.post("/like", (req, res) => {
    const userLiking = req.body.userLiking;
    const postId = req.body.postId;
    const from_id = userLiking;
    const from_name = req.body.from_name;
    const to_name = req.body.to_name;
    const to_id = req.body.to_id;
    const post_body = req.body.post_body;
    const type = "like";
        db.query('SELECT * FROM linkedin.likes WHERE userLiking = ? AND postId = ?',  [userLiking,postId], (err7, result7) => {
            if (result7.length == 0) {
                db.query('INSERT INTO linkedin.likes (userLiking,postId) VALUES (?,?)', [userLiking,postId], (err, result) => {
                    if (err) {
                    }
                    else {
                        db.query("UPDATE linkedin.posts SET likes = likes + 1 WHERE id = ?", postId, (err2,results2) => {
                            if (err2) {}
                            db.query("INSERT into linkedin.notifications (from_id, to_id, from_name, to_name, post, post_body, type) VALUES (?,?,?,?,?,?,?)", [from_id, to_id, from_name, to_name, postId, post_body, type], (err5,results5) => {
                                if (err5) {}
                            });
                        });
                    }
                });
            }
            else {
                db.query("UPDATE linkedin.posts SET likes = likes - 1 WHERE id = ?", postId, (err3,results3) => {
                    if (err3) {}
                });
                db.query("DELETE FROM linkedin.likes WHERE userLiking = ? AND postId = ?", [userLiking,postId], (err4,results4) => {
                    if (err4) {}
                    db.query("DELETE FROM linkedin.notifications WHERE from_id = ? AND post =?", [from_id,postId], (err6,results6) => {
                        if (err6) {}
                    });
                }); 

            }
        })
        res.send("OK");
       
})


app.post("/checkiflike", (req,res) => {
    const userLinikg = req.body.user_id;
    const postId = req.body.postId;
    db.query("SELECT * FROM linkedin.likes WHERE userLiking = ? AND postId = ?",[userLinikg, postId], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/getcomments", (req,res) => {
    db.query("SELECT * FROM linkedin.comments WHERE postId = ?",req.body.postId, (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})

app.post("/sendcomment", async (req, res) => {
    const from_id = req.body.from_id;
    const to_id = req.body.to_id;
    const to_name = req.body.to_name;
    const writer = req.body.writer;
    const commentBody = req.body.input;
    const postId = req.body.postId;
    const type = "comment";
    const post_body = req.body.post_body
    db.query('INSERT INTO linkedin.comments (postId,writerId,writer,commentBody) VALUES (?,?,?,?)', [postId,from_id,writer,commentBody], (err, result) => {
        if (err) {
        }
        else {
            res.send("Comment Inserted");
            db.query("INSERT into linkedin.notifications (from_id, to_id, from_name, to_name, post, post_body, type, comment) VALUES (?,?,?,?,?,?,?,?)", [from_id, to_id, writer, to_name, postId, post_body, type, commentBody], (err5,results5) => {
            });
        }
    });
})

app.post("/uploadadvertisement", async (req, res) => {
    const author = req.body.author;
    const skills = req.body.skills;
    const name = req.body.name
    db.query('INSERT INTO linkedin.advertisements (author,name,skills) VALUES (?,?,?)', [author,name,skills], (err, result) => {
        if (err) {
        }
        else {
            res.send("Advertisement Inserted");
        }
    });
})


app.post("/insertshownad", async (req, res) => {
    db.query('INSERT INTO linkedin.shown_advertisements (advertisement,shown_to) VALUES (?,?)', [req.body.advertisement,req.body.shown_to], (err, result) => {
        if (err) {
        }
        else {
            res.send("Advertisement Inserted");
        }
    });
})

app.post("/getadvertisements", (req,res) => {
    db.query("SELECT * FROM linkedin.advertisements WHERE author != ?",req.body.author, (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/getshownadvertisements", (req,res) => {
    db.query("SELECT * FROM linkedin.shown_advertisements WHERE advertisement = ? AND shown_to = ?",[req.body.advertisement, req.body.shown_to], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})

app.post("/getresume", (req,res) => {
    db.query("SELECT skills, education, experience FROM linkedin.information WHERE user_id = ? ORDER BY id DESC",req.body.id, (err, result) => {
        if (err) {
        }
        else {
            res.send(result[0]);
        }
    })
})

app.post("/checkifuserhasapplied", (req,res) => {
    db.query("SELECT * FROM linkedin.advertisements_applications WHERE applicant_id = ? and advertisement = ?", [req.body.applicant_id, req.body.advertisement], (err,result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})

app.post("/getadvertisementsapps", (req,res) => {
    db.query("SELECT * FROM linkedin.advertisements_applications WHERE advertisement_author = ?",req.body.author, (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/apply", async (req, res) => {
    const advertisement = req.body.advertisement;
    const advertisement_author = req.body.advertisement_author;
    const advertisement_name = req.body.advertisement_name;
    const applicant_id = req.body.applicant_id;
    const applicant_name = req.body.applicant_name;
    const applicant_email = req.body.applicant_email;
    const resume = req.body.resume;

    db.query('SELECT * FROM linkedin.advertisements_applications WHERE advertisement = ? AND applicant_id = ?', [advertisement, applicant_id], (err,result) => {
        if (err) {
        }
        else {
            if (result.length == 0) {
                db.query('INSERT INTO linkedin.advertisements_applications (advertisement, advertisement_author, advertisement_name ,applicant_id, applicant_name, applicant_email, resume) VALUES (?,?,?,?,?,?,?)', [advertisement,advertisement_author,advertisement_name,applicant_id, applicant_name,applicant_email, resume], (err, result) => {
                    if (err) {
                    }
                    else {
                        res.send("Application Inserted");
                    }
                });
            }
            else {
                res.send("Double application");
            }
        }
    })
})



app.post("/checkiffriends", (req,res) => {
    db.query("SELECT * FROM linkedin.friendships WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",[req.body.user1,req.body.user2,req.body.user2,req.body.user1], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/createconv", (req,res) => {
    const user1_id = req.body.user1_id;
    const user2_id = req.body.user2_id;
    const user1_name = req.body.user1_name;
    const user2_name = req.body.user2_name;
    const user1_photo = req.body.user1_photo;
    const user2_photo = req.body.user2_photo;
    db.query("SELECT * FROM linkedin.conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",[req.body.user1_id,req.body.user2_id,req.body.user2_id,req.body.user1_id], (err, result) => {
        if (err) {
        }
        else  if (result.length == 0) {
            db.query('INSERT INTO linkedin.conversations (user1_id,user2_id,user1_name,user2_name,user1_photo,user2_photo) VALUES (?,?,?,?,?,?)', [user1_id,user2_id,user1_name,user2_name,user1_photo,user2_photo], (err, result) => {
                if (err) {
                }
                else {
                    res.send("Conversation Inserted");
                    
                }
            });
        }
    })
})


app.post("/getconv", (req,res) => {
    db.query("SELECT * FROM linkedin.conversations WHERE user1_id = ? OR user2_id = ?",[req.body.user1_id,req.body.user1_id], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})

app.post("/getmessages", (req,res) => {
    db.query("SELECT * FROM linkedin.messages WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)",[req.body.from_id,req.body.to_id,req.body.to_id,req.body.from_id], (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/sendmessage", async (req, res) => {
    const from_id = req.body.from_id;
    const to_id = req.body.to_id;
    const from_name = req.body.from_name;
    const to_name = req.body.to_name;
    const message = req.body.message;
    db.query('INSERT INTO linkedin.messages (from_id,to_id,from_name,to_name,message) VALUES (?,?,?,?,?)', [from_id,to_id,from_name,to_name,message], (err, result) => {
        if (err) {
        }
        else {
            res.send("Message Inserted");
        }
    });
})

app.post("/getnotifications", async(req,res) => {
    db.query('SELECT * FROM linkedin.notifications WHERE to_id = ?',req.body.id, (err, result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/checkifuserhasreacted", (req,res) => {
    db.query("SELECT * FROM linkedin.notifications WHERE from_id = ? and post = ?", [req.body.from_id, req.body.post], (err,result) => {
        if (err) {
        }
        else {
            res.send(result);
        }
    })
})


app.post("/seennotification", (req,res) => {
    db.query("DELETE FROM linkedin.notifications WHERE id = ?",req.body.id, (err, result) => {
        if (err) {
        }
        else {
        }
    })
})
