import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import TicketBlock from "../components/TicketBlock";
import Tickets from "./Tickets";

const SolvedTickets = () => {
    return (
        <div className="tickets-container">
            <Tickets url="/api/ticket_statuses/3/tickets?page=" name="Замороженные"/>
        </div>
    );
};

export default SolvedTickets;