import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummarySheet = () => {
  const [groupedEntries, setGroupedEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/entries/${userId}`);
        console.log("Fetched entries:", res.data);
        setGroupedEntries(res.data);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const allEntries = groupedEntries.flatMap(group => group.entries);

  const totalIncome = allEntries
    .filter(e => e.category === 'Income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = allEntries
    .filter(e => e.category === 'Expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container mt-4">
      <h4><i className="bi bi-table"></i> Transaction Summary</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {groupedEntries.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No entries found</td>
            </tr>
          ) : (
            groupedEntries.map((group, i) =>
              group.entries.map((entry, j) => (
                <tr key={`${i}-${j}`}>
                  <td>{new Date(group.date).toLocaleDateString()}</td>
                  <td>{entry.type}</td>
                  <td>{entry.category}</td>
                  <td>₹{entry.amount}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      <div className="mt-3">
        <p><strong>Total Income:</strong> ₹{totalIncome}</p>
        <p><strong>Total Expense:</strong> ₹{totalExpense}</p>
        <p><strong>Balance:</strong> ₹{balance}</p>
      </div>
    </div>
  );
};

export default SummarySheet;
