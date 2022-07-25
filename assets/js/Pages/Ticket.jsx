import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import login from "./login";
import {AuthContext} from "../context";
import Messages from "../components/Messages";

const Ticket = () => {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const [ticket, setTicket] = useState({status: {name: "unsolved"}});
    const [messages, setMessages] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState("true");
    const [error, setError] = useState("");
    const loadTicket = (id) => {
      axios.get(`/api/tickets/${id}`)
          .then(response => {
              setTicket(response.data)
          })
          .catch(error => {
              console.log (error.response.data["hydra:description"]);
              setError(error.response.data["hydra:description"])
          }).finally(()=>{
              console.log('done')
      })
    }
    const loadMessages = (id) => {
        axios.get(`/api/tickets/${id}/messages`)
            .then(response => {
                console.log(response.data["hydra:member"]);
                setMessages(response.data["hydra:member"]);
            })
            .catch(error => {
                console.log (error.response.data["hydra:description"]);
                setError(error.response.data["hydra:description"])
            }).finally(()=> {
            setIsLoading(false)
            console.log('done')
        })
    }
    const onFreezeTicket = (e) => {
        e.preventDefault();
        changeStatus({status: "/api/ticket_statuses/2"})
    }
    const onSolveTicket = (e) => {
        e.preventDefault();
        changeStatus({status: "/api/ticket_statuses/3"})
    }
    const onUnsolveTicket = (e) => {
        e.preventDefault();
        changeStatus({status: "/api/ticket_statuses/1"})
    }
    const changeStatus = (data) => {
        axios.patch(`/api/tickets/${ticket.id}`, data, {
                headers: {
                    'content-type': "application/merge-patch+json"
                }
            }).then(response => {
            console.log(response.data);
            loadTicket(params.id)
        }).catch(error => {
            console.log(error.response.data);
        }).finally(() => {
            console.log('done');
        })
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        axios.post("/api/messages", {
            content: message,
            ticket: `/api/tickets/${params.id}`
        }).then(response => {
            setMessage("");
            console.log(response.data);
            loadMessages(params.id)
        }).catch(error => {
            console.log(error.response.data);
        }).finally(() => {
            console.log('done');
        })


    }
    useEffect(()=>{
        loadTicket(params.id);
        loadMessages(params.id);
    }, [])
    useEffect( ()=>{
        let isChanged = false;
        if (!messages)
            return
        const fetchData = async (res, rej) => {
            let promises = [];
            messages.map(async message =>
            {
                if ((user.roles.includes("ROLE_ADMIN") && message.isRead == false && !message.owner.roles.includes("ROLE_ADMIN"))
                || (!user.roles.includes("ROLE_ADMIN") && message.isRead == false && message.owner.roles.includes("ROLE_ADMIN")))
                {
                    const promise = axios.patch(`/api/messages/${message.id}`,
                            {
                                isRead: true
                            }, {
                                headers: {
                                    'content-type': "application/merge-patch+json"
                                }
                            })
                    promises.push(promise);
                    console.log("await done");
                    isChanged = true;
                }
            })
            await Promise.all(promises);

        }
        fetchData().then(() =>{
            console.log("done");
            if(isChanged)
                loadMessages(params.id);
            isChanged = false;
        })

    },[messages])
    console.log(params);
    return (
        <div>
            {error ?
                <div>{error}</div>:
            isLoading ?
                <div>Загрузка</div>
                : <div>
                    <h2>Тикет №{ticket.id}</h2>
                    <h4>{ticket.title}</h4>
                    <strong>{ticket.description}</strong>
                    <div>{ticket.details}</div>
                    <div>
                        <h1>Сообщения</h1>
                        <Messages messages={messages}/>
                    </div>
                <br/>
                    {ticket.status.name == "unsolved" ?
                        <div>
                            Отправить сообщение
                            <form action="/api/messages" className="message-form" onSubmit={onSubmitForm}>
                                <textarea name="content"  className="message-form__input" cols="30" rows="10" value={message} onChange={e => setMessage(e.target.value)}/>
                                <button>Отправить</button>
                            </form>
                        </div>
                        : ticket.status.name == "frozen" ?
                            <h2>
                                Тикет заморожен
                            </h2> :
                            <div>
                                Тикет решён!
                            </div>
                    }
                    <div>
                        {user.roles.includes("ROLE_ADMIN") && ticket.status.name == "unsolved" ?
                                <div>
                                    <button onClick={onFreezeTicket}>Заморозить тикет</button>
                                    <button onClick={onSolveTicket}>Перенести в решённые</button>
                                </div>
                            : user.roles.includes("ROLE_ADMIN") && ticket.status.name == "frozen" ?
                                <div>
                                    <button onClick={onUnsolveTicket}>Разморозить тикет</button>
                                    <button onClick={onSolveTicket}>Перенести в решенные</button>
                                </div>
                                : user.roles.includes("ROLE_ADMIN") && ticket.status.name == "solved" ?
                                    <div>
                                        <button onClick={onUnsolveTicket}>Перенести в нерешённые</button>
                                    </div>
                                    : <div></div>


                        }
                    </div>

                </div>

            }
        </div>
    );
};

export default Ticket;