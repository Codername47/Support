import React from 'react';


const MyInput = (props) => {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input className="input" {...props}/>
        </div>
    );
};

export default MyInput;