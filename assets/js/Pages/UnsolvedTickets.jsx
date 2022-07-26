import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import TicketBlock from "../components/TicketBlock";
import Tickets from "./Tickets";

const UnsolvedTickets = () => {
    return (
        <div className="tickets-container">
            <Tickets url="/api/ticket_statuses/1/tickets?page=" name="Нерешённые"/>
        </div>
    );
};

export default UnsolvedTickets;