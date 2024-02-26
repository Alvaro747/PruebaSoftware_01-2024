
import { useState } from 'react';
import './styles/sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <a href="#user">User</a>
      <a href="#chart">Chart</a>
      <a href="#logout">Logout</a>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Sidebar</button>
    </div>
  );
}

export default Sidebar;
