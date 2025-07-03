// src/components/EntryForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EntryForm = ({ onEntryAdded }) => {
  const [category, setCategory] = useState('Expense');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const payload = {
      userId,
      category,
      type,
      amount,
      date,
    };

    try {
        const response = await axios.post('http://localhost:5000/api/addEntry', payload);
        console.log(" Entry added:", response.data);
        

      // Refresh summary and pie chart
      if (onEntryAdded) onEntryAdded();

      // Reset form
      setType('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("Failed to add entry");
    }
  };

  return (
    <div className='fo'>
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      marginTop: '20px',
      fontSize: '28px',      // Make font larger
      width: '100%',
      maxWidth: '800px',
      margin: 'auto',
      maxHeight:'1000px'
    }}>
      <h5 style={{ fontSize: '32px', marginBottom: '20px' }}>Add Entry</h5>

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control mb-3">
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <label>Type:</label>
      <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="form-control mb-3" />

      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control mb-3" />

      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control mb-3" />

      <button type="submit" className="btn btn-primary btn-lg mt-2">Submit</button>
    </form>
    </div>
  );
};

export default EntryForm;
