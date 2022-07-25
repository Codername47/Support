import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import TicketBlock from "../components/TicketBlock";

const Tickets = (props) => {
    const [tickets, setTickets] = useState([]);
    const [countPages, setCountPages] = useState(1);
    const [page, setPage] = useState(1);
    let pagesArray = []
    for (let i = 0; i < countPages; i++)
    {
        pagesArray.push(i + 1);
    }
    console.log(countPages);
    useEffect(()=>{
        setTickets([]);
        axios.get(props.url + page)
            .then(res => {
                setTickets(res.data["hydra:member"]);
                if (res.data["hydra:view"])
                    setCountPages(res.data["hydra:view"]["hydra:last"].split("=")[1]);
                else
                    setCountPages(1);
                console.log(res);
            })
    }, [page])

    return (
        <div className="tickets-container">
            <h2>{props.name}</h2>
            {tickets.map(ticket =>
                <TicketBlock ticket={ticket}/>
            )}
            <div>
                {pagesArray.map(p =>
                    <a className={p == page ? "link-current-page" : "link-page"} onClick={() => setPage(p)}>
                        {p}
                    </a>
                )}
            </div>
        </div>
    );
};

export default Tickets;