import React, { useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../services/apiService";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Tenant" });

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    const handleCreateUser = async () => {
        try {
            const user = await createUser(newUser);
            setUsers([...users, user]);
            setNewUser({ name: "", email: "", role: "Tenant" });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateUser = async (id) => {
        try {
            const updatedUser = await updateUser(id, { role: "Admin" });
            setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {`${user.name} - ${user.email} - ${user.role}`}
                        <button onClick={() => handleUpdateUser(user.id)}>Promote to Admin</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Create New User</h3>
            <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button onClick={handleCreateUser}>Create User</button>
        </div>
    );
};

export default UsersList;
