import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import bgImg from '../../assets/images/bg.jpg'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const changeEmail = e => {
        setEmail(e.target.value);
    };

    const changePassword = e => {
        setPassword(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password

        };
        axios.post('http://localhost:4000/api/login', userData)
            .then(response => {
                console.log(response.data)
            })
        history.push('/dashboard')
    }
    return (
        <div className="login text-center mt-5" styles={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}>
            <div className="container col-md-4">
                <div className="form-div">
                    <h1 >Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control form-group" type="text" placeholder="E-mail" onChange={changeEmail} value={email} />
                        <input className="form-control form-group" type="password" placeholder="Password" onChange={changePassword} value={password} />
                        <input type="submit" className="btn btn-danger btn-block" />
                        <div className="text-center pt-3">Don't have account?Please <a href="sign-up">Sign up</a></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;