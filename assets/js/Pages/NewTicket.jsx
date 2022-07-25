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
    useEffect(()=>{
        switch (statusSent)
        {
            case 0:
                break;
            case "Success":
                alert("Успешно создан тикет")
                router(`/Ticket/${idTicket}`);
                break;
            default:
                alert(statusSent);
                break;
        }
    }, [statusSent])
    const onSubmitForm = (e) => {
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
        <form id="ticket" className="ticket-form" onSubmit={onSubmitForm}>
            <MyInput name="title" label="title" value={title} onChange={e => setTitle(e.target.value)}/>
            <MyInput name="description" label="description" value={description} onChange={e => setDescription(e.target.value)}/>
            <label htmlFor="details">Details</label>
            <textarea name="details" value={details} onChange={e => setDetails(e.target.value)}/>
            <button>Send</button>
        </form>
    );
};

export default NewTicket;