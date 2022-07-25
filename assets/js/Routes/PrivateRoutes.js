import React from "react";
import Main from "../Pages/main";
import About from "../Pages/About";
import NewTicket from "../Pages/NewTicket";
import MyTickets from "../Pages/MyTickets";
import Ticket from "../Pages/Ticket";

export const privateRoutes = [
    {path: "/", element: <Main/>},
    {path: "/about", element: <About/>},
    {path: "/NewTicket", element: <NewTicket/>},
    {path: "/Tickets", element: <MyTickets/>},
    {path: "/Ticket/:id", element: <Ticket/>}
]