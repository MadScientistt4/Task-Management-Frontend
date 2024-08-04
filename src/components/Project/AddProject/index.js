import React, { useState } from 'react';
import "./style.css";

export default function AddProject({ setModal, fetchProjects }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const url = 'http://localhost:5000/projects';
  const handleCloseModal = () => {
    setModal(false);
  }
  const handleAddProject = async () => {
    const update = {
      user_id: 31,
      project_name: newTitle,
      description: newDescription
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
      setModal(false); // Hide the modal
      fetchProjects(); // Refresh the project list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div  className="modal">
      <div className='modal-background'></div>
      <div className="modal-content">
        <div className='modal-top'>
          <h2>Enter Project Details: </h2>
          <button className='close-button' onClick={handleCloseModal}>close</button>
        </div>
        <div className='name'>
          <h3>Name:</h3>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </div>
        <div className='description'>
          <h3>Description:</h3>
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </div>
        <button id="submit" onClick={handleAddProject}>Submit</button>
      </div>
    </div>
  );
}
