import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../context";
import TicketBlock from "../components/TicketBlock";
import Tickets from "./Tickets";

const MyTickets = () => {
    const { user } = useContext(AuthContext);
    let url = "/api/users/"+user.id+"/tickets?page=";
    return (
        <div className="tickets-container">
            <Tickets url={url} name="Мои тикеты"/>
        </div>
    );
};

export default MyTickets;