
import React, { useState } from "react"
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'
import urlContext from '../URLContext'
import axios from 'axios';


export default function SignInPage() {

    const [path, setPath] = useState("/login");
    const [formData, setFormData] = useState({ name: "", password: "" });

    const baseURL = React.useContext(urlContext);

    function checkIfEmail(str) {
        // Regular expression to check if string is email
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

        return regexExp.test(str);
    }

    const handleSubmit = (event) => {
        event.preventDefault();  //Stop reloading

        // if (formData.name === login_name && formData.password === login_password)
        //     setPath("/home");

        var logInfo = "";
        if (checkIfEmail(formData.name)) {
            logInfo = "loginEmail=" + formData.name + "&loginPassWord=" + formData.password;
        }
        else
            logInfo = "loginName=" + formData.name + "&loginPassWord=" + formData.password;


        let config = {
            method: 'get',
            url: `${baseURL}/api/scanner/login?` + logInfo
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <header style={HeaderStyle}>
            <div className="text-center ">
                <div style={{ height: 100 }}></div>
                <h2>Sign in to us</h2>
                <form action={path} onSubmit={handleSubmit}>

                    <p>
                        <label>Username or email address</label><br />
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </p>
                    <p>
                        <label>Password</label>
                        {/* <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>  */}
                        <br />
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </p>

                    <p>
                        <button id="sub_btn" type="submit" >Login</button>
                    </p>

                </form>
                <footer>
                    {/* <p>First time? <Link to="/register">Create an account</Link>.</p> */}
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>

        </header>
    )
}
const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
