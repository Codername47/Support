import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useNavigate();
    const {user, setUser} = useContext(AuthContext)
    const onSubmitForm = async (e) => {
        e.preventDefault()
        axios
            .post('/auth', {
                username: login,
                password: password
            })
            .then(response => {
                console.log(response.data);
                window.user = response.data.user;
                setUser(window.user);
                router('/');

            }).catch(error => {
            console.log(error.response.data);
        }).finally(() => {
            console.log('done');
        })
    }
    return (
        <div>
            <form onSubmit={onSubmitForm}>
                <MyInput name="login" type="text" label="Username" value={login} onChange={e => setLogin(e.target.value)}/>
                <MyInput name="password" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button>go!</button>
            </form>

        </div>
    );
};

export default Login;