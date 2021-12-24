import { useState } from "react";
import Axios from 'axios';
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import "./SignUp.css"


function SignUp() {
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");
    const [passerr, setPasserr] = useState("");
    const [nameerr, setNameerr] = useState("");
    const [surnameerr, setSurnameerr] = useState("");
    const [emailerr, setEmailerr] = useState("");


    Axios.defaults.withCredentials = true

    var isValid = true;

    let history = useHistory();

    const addUser = async (event) => {

        event.preventDefault()

        let formData = {
            name: event.target[0].value,
            surname: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value,
            password2: event.target[4].value

        };

        if (formData.name.length == 0) {
            setNameerr("Name is Required");
            isValid = false;
        }

        if (formData.surname.length == 0) {
            setSurnameerr("Surname is required");
            isValid = false;
        }

        if (formData.password!==formData.password2) {
            setPasserr("passwords dont match");
            isValid = false;
        }
        if (isValid) {
            Axios.post('http://localhost:3001/create', {name: name, surname: surname, email: email, password: password, photo: photo}).then((response) => {
                if (response === "Double email") setEmailerr("There is already a user with this email");
                else {
                    history.push('/cofirmation',true);
                }
            });
        }
    }


        const uploadImage = async(e) => {
            console.log(e.target.files);
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            setPhoto(base64);
        }

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

        return (
            <div>
                <div className = "form">
                     <form onSubmit={addUser}>
                        <input id = "name" type='text' name='name' placeholder='name' onChange={(event) => {setName(event.target.value)}}/>
                        <input id = "surname" type='text' name='surname' placeholder='surname' onChange={(event) => {setSurname(event.target.value)}}/>
                        <input id = "email" type='email' name='email' placeholder='email' onChange={(event) => {setEmail(event.target.value)}}/>
                        <input id = "password" type = 'password' name = 'password' placeholder = 'password' onChange={(event) => {setPassword(event.target.value)}}/>
                        <input id = "password2" type = 'password' name = 'password2' placeholder = 'confirm-password'></input>
                        <input id = "file" type = 'file' name = 'photo' accept="image/*" onChange={(e) => { uploadImage(e) }}></input>
                        <button id = "SignUp_button">SignUp</button>
                    </form>
                </div>
                
                <div><h1>{passerr}</h1></div>
                <div><h1>{nameerr}</h1></div>
                <div><h1>{surnameerr}</h1></div>
                <div><h1>{emailerr}</h1></div>
            </div>
        );
}

export default SignUp;