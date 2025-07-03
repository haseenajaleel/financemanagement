import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import SummarySlider from '../components/Summaryslider';
import Alert from '../components/Alert';
import Reminder from '../components/Reminder';
import PieChart from '../components/PieChartDisplay';
import './dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  const [userName, setUserName] = useState('');

useEffect(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    setUserName(storedName);
  }
}, []);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/summary/${userId}`);
        setIncome(response.data.income);
        setExpenses(response.data.expenses);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    

    if (userId) fetchSummary();
  }, [userId]);
  const refreshSummary = async () => {
    if (!userId) return;
    try {
        const response = await axios.get(`http://localhost:5000/api/summary/${userId}`);
      setIncome(response.data.income);
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Error refreshing summary:", error);
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/'); 
  };
  return (
    <div className="dashboard-wrapper"style={{ minHeight: '100vh', overflowY: 'auto' }}>
    <Navbar handleLogout={handleLogout} />
    <div className="section" style={{
  textAlign: 'center',
  fontSize: '40px',
  fontWeight: 'bold',
  color: '#003366',
  backgroundColor: 'lightblue',
  padding: '20px',
  borderRadius: '12px'
}}>
  WELCOME!, {userName || 'User'}!
</div>
<SummarySlider income={income} expenses={expenses} />
 
  
    <div className="section two-column">
      <div className="column" >
      <EntryForm onEntryAdded={refreshSummary} />

      </div>
      <div className="pi">
        <PieChart income={income} expenses={expenses} />
      </div>
    </div>
  
    <div className="section">
      <Alert income={income} expenses={expenses} />
      <Reminder type="EMI" amount={5000} dueDate="28th June" />
    </div>
  </div>
  
  );
}
