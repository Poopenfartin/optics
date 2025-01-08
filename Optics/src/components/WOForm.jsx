import React, { useState } from 'react';
import axios from 'axios';


const WOForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const addWO = async () => {
    try {
      const response = await axios.post('http://localhost:5000/todos', { task });
      onAdd(response.data);
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <input type="text" placeholder="Input Work Order Number..." value={task} onChange={(e) => setTask(e.target.value)} />

  );
};
export default WOForm;