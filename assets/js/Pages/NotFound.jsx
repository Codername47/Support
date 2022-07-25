import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>
                404 страница не найдена
            </h1>
            <div>
                <Link to="/">На главную</Link>
            </div>
        </div>
    );
};

export default NotFound;