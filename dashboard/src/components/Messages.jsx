import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Context } from '../main';

const Messages = () => 
{
    const [messages, setMessages] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get (
                    "http://localhost:4000/api/v1/message/getall",
                    { withCredentials: true}
                );
                setMessages(data.messages);
            } catch (error) {
                console.log( "Праблемс", error);
            }
        };
        fetchMessages();
    }, []);

    if (isAuthenticated) {
        return <Navigate to={"/login"} />;
      } 
    return (
        <section className='page messages'>
            <h1>Повідомлення</h1>
            <div className='banner'>
                {messages && messages.length > 0 ? (
                    messages.map((element) => {
                        return (
                            <div className='card' key={element._id}>
                                <div className='details'>
                                    <p>Прізвище: <span>{element.firstName}</span></p>
                                    <p>Ім'я: <span>{element.lastName}</span></p>
                                    <p>Email: <span>{element.email}</span></p>
                                    <p>Телефон: <span>{element.phone}</span></p>
                                    <p>Повідомлення: <span>{element.message}</span></p>
                                </div>
                                </div>
                        );
                    })
                ) : (
                    <h1>Немає повідомлень</h1>
                )}
            </div>

        </section>
    );
};
export default Messages
