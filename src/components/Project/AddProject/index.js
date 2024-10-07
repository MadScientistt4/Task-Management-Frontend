import React, { useState } from 'react';
import "./style.css";

export default function AddProject({ modalOn, setModal, fetchProjects }) {
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
      setModal(false);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`modal ${modalOn ? "is-active" : ""}`}>
      <div className='modal-background'></div>
      <div className="modal-card">
        <header className='modal-card-head'>
          <p className='modal-card-title'>Enter Project Details: </p>
          <button className='delete' onClick={handleCloseModal}></button>
        </header>
        <section className='modal-card-body'>
          <div className='name'>
            <h3>Name:</h3>
            <input className='input'
              style={{ width: '30%' }}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className='description'>
            <h3>Description:</h3>
            <input
              className='input'
              style={{ width: '30%' }}
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button style={{margin: '5px', marginTop: '15px'}} className='button is-primary' id="submit" onClick={handleAddProject}>Submit</button>
          </div>
        </section>
      </div>
    </div>
  );
}
