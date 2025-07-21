import React from 'react';
import ReactDOM from 'react-dom/client';
import ExecutiveOrders from './components/ExecutiveOrders';

const App = () => (
  <div>
    <h1>Trump Tracker MVP</h1>
    <ExecutiveOrders />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
