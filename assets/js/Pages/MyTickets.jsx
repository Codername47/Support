import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../context";
import TicketBlock from "../components/TicketBlock";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(()=>{
        axios.get(`/api/users/${user.id}/tickets`)
            .then(res => {
                setTickets(res.data["hydra:member"]);
                console.log(res.data)
            })
    }, [])
    return (
        <div className="tickets-container">
            {tickets.map(ticket =>
                <TicketBlock ticket={ticket}/>
            )}
        </div>
    );
};

export default MyTickets;