import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "../Pages/main";
import Login from "../Pages/login";
import Register from "../Pages/register";
import {AuthContext} from "../context";
import {publicRoutes} from "../Routes/PublicRoutes";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";
import {privateRoutes} from "../Routes/PrivateRoutes";
import {supportRoutes} from "../Routes/SupportRoutes";

const Router = () => {
    const {user, setUser} = useContext(AuthContext)
    return (
        user
        ? user.roles.includes("ROLE_ADMIN") ?
                <Routes>
                    {supportRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={route.element}
                        />
                    )}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            :
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                    />
                )}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                    />
                )}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
    );
};

export default Router;