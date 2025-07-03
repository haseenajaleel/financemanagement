import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './components/AuthPage'; // Keep as it is
import SummarySheet from './components/SummarySheet';

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summary" element={<SummarySheet />} />

      </Routes>
    
    
  );
}

export default App;
