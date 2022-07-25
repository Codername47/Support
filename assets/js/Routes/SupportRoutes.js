import React from "react";
import Main from "../Pages/main";
import About from "../Pages/About";
import Ticket from "../Pages/Ticket";
import UnsolvedTickets from "../Pages/UnsolvedTickets";
import FrozenTickets from "../Pages/FrozenTickets";
import SolvedTickets from "../Pages/SolvedTickets";

export const supportRoutes = [
    {path: "/", element: <Main/>},
    {path: "/about", element: <About/>},
    {path: "/Ticket/:id", element: <Ticket/>},
    {path: "/UnsolvedTickets", element: <UnsolvedTickets/>},
    {path: "/FrozenTickets", element: <FrozenTickets/>},
    {path: "/SolvedTickets", element: <SolvedTickets/>}
]