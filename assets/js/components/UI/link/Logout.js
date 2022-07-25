import React, {useContext} from 'react';
import axios from "axios";
import {AuthContext} from "../../../context";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const {user, setUser} = useContext(AuthContext)
    const router = useNavigate();
    const onLogout = async (e) => {
        e.preventDefault();
        axios
            .post('/logout', {
            })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
            console.log(error.response.data);
        }).finally(() => {
            console.log('done');
            router("/");
            window.user = null;
            setUser(null);
        })
    }
    return (
        user &&
        <a href="/logout" className="logout navlink" onClick={onLogout}>Выйти</a>
    );
};

export default Logout;