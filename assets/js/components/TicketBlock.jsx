import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const TicketBlock = (props) => {
    let { user } = useContext(AuthContext);
    let router = useNavigate();
    let [countMessages, setCountMessages] = useState(0);
    let [countUnreadMessages, setCountUnreadMessages] = useState(0);
    useEffect(()=>{
        props.ticket.messages.map(message => {
            setCountMessages((current) => current + 1);
            if (message.isRead == false &&
                (user.roles.includes("ROLE_ADMIN") && !message.owner.roles.includes("ROLE_ADMIN") ||
                    (!user.roles.includes("ROLE_ADMIN") && message.owner.roles.includes("ROLE_ADMIN"))))
                setCountUnreadMessages((current) => current + 1)
        })
    }, [])
    const onTicketClick = () => {
        router(`/Ticket/${props.ticket.id}`);
    }
    return (
        <div className=
                 {props.ticket.status.name == "unsolved"
                     ? "ticket-unsolved-container ticket-container"
        : props.ticket.status.name == "frozen" ? "ticket-frozen-container ticket-container"
        : "ticket-solved-container ticket-container"} onClick={onTicketClick}>
            <div className="ticket-content">
                <div className="ticket-content__title">Заголовок: {props.ticket.title}</div>
                <div className="ticket-content__description">Описание: {props.ticket.description}</div>
                <div className="ticket-content__messages">Сообщений: {countMessages}</div>
                <div className="ticket-content__data-creation">Создан: {props.ticket.dateCreation}</div>
            </div>
            <div className="ticket-info">
                <div className="ticket-info__username">Пользователь: {props.ticket.owner.username}</div>
                {countUnreadMessages && <div className="ticket-info__unread">{countUnreadMessages}</div>}
                <div className="ticket-info__date-update">Обновлено: {props.ticket.dateUpdate}</div>
            </div>
        </div>


    );
};

export default TicketBlock;