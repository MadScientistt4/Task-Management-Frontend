import React, { useState } from 'react';
import "./style.css";
import { useParams } from 'react-router-dom';
import { Dropdown } from '../../ReusableComponents/dropdown';
export default function AddTask({ modalOn, setModal, fetchTasksInProject }) {
  const { id } = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [assignToUser, setAssignToUser] = useState("");
  const [dropdownOn, setDropdown] = useState(false);
  const url = 'http://localhost:5000/tasks';
  const statusValues = ['PENDING', 'IN_PROGRESS', 'COMPLETE']
  const handleNewStatus = (value) => {
    setNewStatus(value);
  }
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
      setModal(false);
      fetchTasksInProject();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`modal ${modalOn ? "is-active" : ""}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Enter Task Details: </p>
          <button className="delete" onClick={handleClose}></button>
        </header>
        <section className='modal-card-body'>
          <div className='name'>
            <h3>Title:</h3>
            <input
              className='input'
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
          <div className='status'>
            <h3>Status:</h3>
            <Dropdown
              dropdownOn={dropdownOn}
              buttonDefaultText={newStatus}
              options={statusValues}
              onSelectItem={handleNewStatus}
              toggleDropdown={setDropdown}
            />
          </div>
          <div className='username'>
            <h3>Assign to user:</h3>
            <input
              className='input'
              style={{ width: '30%' }}
              type="text"
              value={assignToUser}
              onChange={(e) => setAssignToUser(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="button is-primary" id="submit" onClick={handleAddTask}>Submit</button>
          </div>
        </section>
      </div>
    </div>
  );
}
