import React, { useEffect, useState } from "react";
import { fetchConversations, sendMessage, markMessageAsRead, deleteMessage } from "../../services/apiService";

const MessagesList = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState({ recipient: "", content: "" });

    useEffect(() => {
        const getConversations = async () => {
            try {
                const data = await fetchConversations();
                setConversations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);

    const handleSendMessage = async () => {
        try {
            const message = await sendMessage(newMessage);
            setConversations([...conversations, message]);
            setNewMessage({ recipient: "", content: "" });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markMessageAsRead(id);
            setConversations(conversations.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteMessage = async (id) => {
        try {
            await deleteMessage(id);
            setConversations(conversations.filter((msg) => msg.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {conversations.map((msg) => (
                    <li key={msg.id}>
                        {`${msg.sender}: ${msg.content}`}
                        {msg.read ? "(Read)" : "(Unread)"}
                        <button onClick={() => handleMarkAsRead(msg.id)}>Mark as Read</button>
                        <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Send a New Message</h3>
            <input
                type="text"
                placeholder="Recipient"
                value={newMessage.recipient}
                onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
            />
            <input
                type="text"
                placeholder="Message"
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default MessagesList;
