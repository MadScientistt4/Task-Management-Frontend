import React, { useState } from 'react';
import "./style.css";
import { useParams } from 'react-router-dom';
export default function AddTask({ setModal, fetchTasksInProject }) {
  const { id } = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [assignToUser, setAssignToUser] = useState("");
  const url = 'http://localhost:5000/tasks';

  const handleClose = () => {
    setModal(false);
  }
  const handleAddTask = async () => {
    const update = {
      user_id: 31,
      tasks_title: newTitle,
      description: newDescription,
      status: newStatus,
      username: assignToUser,
      project_id: parseInt(id)
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      console.log(data);
      setNewTitle('');
      setNewDescription('');
      setAssignToUser('');
      setNewStatus('');
      setModal(false); // Hide the modal
      fetchTasksInProject(); // Refresh the project list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="backdrop" className="backdrop">
      <div className="modal">
        <div className='modal-top'>
          <h2>Enter Task Details: </h2>
          <button onClick={handleClose}>close</button>
        </div>
        <div className='name'>
          <h3>Title:</h3>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </div>
        <div className='description'>
          <h3>Description:</h3>
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </div>
        <div className='status'>
          <h3>Status:</h3>
          <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
        </div>
        <div className='username'>
          <h3>Assign to user:</h3>
          <input type="text" value={assignToUser} onChange={(e) => setAssignToUser(e.target.value)} />
        </div>
        <button id="submit" onClick={handleAddTask}>Submit</button>
      </div>
    </div>
  );
}
