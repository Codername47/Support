import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context";

const Main = () => {

    const {user} = useContext(AuthContext)

    return (
        <div>
            HelloWorld! 
            {!user &&
                <Link to="/login">Залогиниться</Link>
            }
        </div>
    );
};

export default Main;