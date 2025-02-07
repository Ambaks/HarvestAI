import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";


import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </StrictMode>,
)
