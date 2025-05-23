import React, { useEffect, useState } from "react";
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from "../../services/apiService";

const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newExpense, setNewExpense] = useState({ category: "", amount: "", description: "" });

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const data = await fetchExpenses();
                setExpenses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getExpenses();
    }, []);

    const handleCreateExpense = async () => {
        try {
            const expense = await createExpense(newExpense);
            setExpenses([...expenses, expense]);
            setNewExpense({ category: "", amount: "", description: "" });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateExpense = async (id) => {
        try {
            const updatedExpense = await updateExpense(id, { category: "Updated" });
            setExpenses(expenses.map((expense) => (expense.id === id ? updatedExpense : expense)));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter((expense) => expense.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Property Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {`${expense.category} - $${expense.amount} - ${expense.description}`}
                        <button onClick={() => handleUpdateExpense(expense.id)}>Update</button>
                        <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Create New Expense</h3>
            <input
                type="text"
                placeholder="Category"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
            <button onClick={handleCreateExpense}>Create Expense</button>
        </div>
    );
};

export default ExpensesList;
