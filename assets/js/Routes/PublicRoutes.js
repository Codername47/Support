import React from 'react';
import Main from "../Pages/main";
import Login from "../Pages/login";
import Register from "../Pages/register";


export const publicRoutes = [
    {path: "/", element: <Main/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
]