import React, { useState } from 'react';
import axios from 'axios'

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const changeName = e => {
        setName(e.target.value);
    };
    const changeEmail = e => {
        setEmail(e.target.value);
    };
    const changePassword = e => {
        setPassword(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        const registered = {
            name: name,
            email: email,
            password: password

        };
        axios.post('http://localhost:4000/api/register', registered)
            .then(response => {
                console.log(response.data)
            })
    }
    return (
        <div className="signup text-center mt-5">
            <div className="container col-md-4">
                <h1>Sign up</h1>
                <div className="form-div ">
                    <form onSubmit={handleSubmit}>
                        <input className="form-control form-group" type="text" placeholder="Name" onChange={changeName} value={name} />
                        <input className="form-control form-group" type="text" placeholder="E-mail" onChange={changeEmail} value={email} />
                        <input className="form-control form-group" type="password" placeholder="Password" onChange={changePassword} value={password} />
                        <input type="submit" className="btn btn-danger btn-block" />
                        <div className="text-center pt-3">Already have account?<a href="login">Login</a></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;