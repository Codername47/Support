import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NewTicket = () => {
    const router = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [details, setDetails] = useState("");
    const [idTicket, setIdTicket] = useState();
    const [statusSent, setStatusSent] = useState(0);
    const [error, setError] = useState("")
    useEffect(()=>{
        switch (statusSent)
        {
            case 0:
                setError("");
                break;
            case "Success":
                alert("Успешно создан тикет")
                router(`/Ticket/${idTicket}`);
                break;
            default:
                let msg = statusSent.response.data["hydra:description"].split(":")[1];
                msg = msg.split("\n")[0];
                setError(msg);
                break;
        }
    }, [statusSent])
    const onSubmitForm = (e) => {
        setStatusSent(0);
        e.preventDefault();
        axios.post('/api/tickets', {
            title: title,
            description: description,
            details: details
        }).then(response =>{
            setIdTicket(response.data.id);
            setStatusSent("Success");
        }).catch(error => {
            setStatusSent(error);
        }).finally(() =>
            console.log("done")
        )
    }
    return (
        <div>
            Новый тикет:
            <form id="ticket" className="ticket-form" onSubmit={onSubmitForm}>
                <MyInput name="title" label="title" value={title} onChange={e => setTitle(e.target.value)}/>
                <MyInput name="description" label="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <label htmlFor="details">Details</label>
                <textarea name="details" cols="50" rows="15" className="message-form__input" value={details} onChange={e => setDetails(e.target.value)}/>
                <button>Send</button>
            </form>
            {error != "" && <div className="error">{error}</div>}
        </div>
    );
};

export default NewTicket;