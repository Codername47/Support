import React, {useState} from 'react';
import {dateConvert} from "../Functions/DateConvert";

const Messages = (props) => {


    return (
        props.messages.map(message =>
        {
            let date = dateConvert(message.dateSend);
            return (
                <div>
                {message.owner.roles.includes("ROLE_ADMIN")
                    ? <div className="admin-message">
                        <div className="admin-message__username">Администратор: {message.owner.username}</div>
                        <div className="admin-message__content">{message.content}</div>
                        <div className="admin-message__date">Дата: {date}</div>
                        {message.isRead ? <div className="admin-message__read">прочитано</div>
                            : <div className="admin-message__read">не прочитано</div>}
                    </div>
                    : <div className="user-message">
                        <div className="user-message__username">Пользователь: {message.owner.username}</div>
                        <div className="user-message__content">{message.content}</div>
                        <div className="user-message__date">Дата: {date}</div>
                        {message.isRead ? <div className="user-message__read">прочитано</div>
                            : <div className="user-message__read">не прочитано</div>}
                    </div>
                }
            </div>
            )

        }

            )

    )
}

export default Messages;