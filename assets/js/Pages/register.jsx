import React, {useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onSubmitForm = (e) => {
        setError("")
        e.preventDefault()
        axios
            .post('/api/users', {
                username: username,
                password: password
            })
            .then(response => {
                console.log(response.data);
                alert("Успешно создан")
            }).catch(error => {
                let msg = error.response.data["hydra:description"].split(":")[1];
                msg = msg.split("\n")[0];
                console.log(msg);
                setError(msg);
            console.log(error.response.data);
        }).finally(() => {
            console.log('done');
        })
    }
    return (
        <div>
            Регистрациия
            <form onSubmit={onSubmitForm}>
                <MyInput name="login" type="text" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <MyInput name="password" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button>Зарегистрироваться</button>
                {error != "" && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Register;