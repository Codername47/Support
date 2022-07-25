import React from "react";
import Main from "../Pages/main";
import About from "../Pages/About";
import Ticket from "../Pages/Ticket";

export const supportRoutes = [
    {path: "/", element: <Main/>},
    {path: "/about", element: <About/>},
    {path: "/Ticket/:id", element: <Ticket/>}
]