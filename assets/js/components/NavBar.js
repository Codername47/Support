import React, {useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context";
import Logout from "./UI/link/Logout";
import {navLinkUserRoutes} from "../Routes/NavLinkUserRoutes"
import {navLinkAnonRoutes} from "../Routes/NavLinkAnonRoutes";
import {navLinkSupportRoutes} from "../Routes/NavLinkSupportRoutes";

const NavBar = () => {
    const {user, setUser} = useContext(AuthContext);
    return (
            !user ?
                <nav>
                    {navLinkAnonRoutes.map(route =>
                        <Link className="navlink" to={route.path}>{route.name}</Link>
                    )}
                    <Logout/>
                </nav>
            : !user.roles.includes("ROLE_ADMIN")
                    ?
                    <nav>
                        {navLinkUserRoutes.map(route =>
                            <Link className="navlink" to={route.path}>{route.name}</Link>
                        )}
                        <Logout/>
                    </nav>
                    :
                    <nav>
                        {navLinkSupportRoutes.map(route =>
                            <Link className="navlink" to={route.path}>{route.name}</Link>
                        )}
                        <Logout/>
                    </nav>

    );
};

export default NavBar;