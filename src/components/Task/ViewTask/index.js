import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import moment from 'moment';
import { Dropdown } from '../../ReusableComponents/dropdown';

export default function ViewTask({ modalOn, setModal, item, fetchTask }) {
    const [updatedTitle, setUpdatedTitle] = useState(item.task_title || "");
    const [updatedStatus, setUpdatedStatus] = useState(item.task_status || "");
    const [dropdownOn, setDropdown] = useState(false);
    const url = `http://localhost:5000/tasks/${item.task_id}`;
    const statusValues = ["PENDING", "IN_PROGRESS", "DONE"];
    const handleCloseView = () => {
        setModal(false);
        setUpdatedTitle("");
        setUpdatedStatus("");
    }
    const handleUpdatedTitle = (value) => {
        setUpdatedTitle(value);
    }
    const handleUpdatedStatus = (value) => {
        setUpdatedStatus(value);
    }

    const handleUpdate = () => {
        const updateTask = {
            title: updatedTitle,
            status: updatedStatus
        };
        axios.put(url, updateTask, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setUpdatedTitle("");
                setUpdatedStatus("");
                setModal(false);
                fetchTask();
            })
            .catch(error => {
                console.log("ERROR:", error);
            });
    };

    return (
        <div className={`modal ${modalOn ? "is-active" : ""}`}>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>Task Details</p>
                    <button className='delete' onClick={handleCloseView}></button>
                </header>
                <section className='modal-card-body'>
                    <div className='task-title'>
                        <p style={{fontSize: '20px'}}>Title: </p>
                        <input
                            className='input' 
                            style={{ width: '30%' }}
                            placeholder='updated title'
                            onChange={(e) => handleUpdatedTitle(e.target.value)}
                            value={updatedTitle === "" ? item.task_title : updatedTitle}
                        />
                    </div>
                    <div className='assigned-user'>
                        <p style={{fontSize: '20px'}}>Assigned to: </p>
                        <p style={{display:'flex', justifyContent: 'center'}}>{item.task_assigned_user}</p>
                    </div>
                    <div className='deadline'>
                        <p style={{fontSize: '20px'}}>Deadline: </p>
                        <p style={{display:'flex', justifyContent: 'center'}}>{moment(item.task_deadline).format('MMMM Do YYYY')}</p>
                    </div>
                    <div className='status'>
                        <p style={{fontSize: '20px'}}>Status: </p>
                        <Dropdown 
                            dropdownOn={dropdownOn} 
                            buttonDefaultText={updatedStatus || item.task_status} 
                            options={statusValues}
                            onSelectItem={handleUpdatedStatus} 
                            toggleDropdown={setDropdown}
                        />
                    </div>
                    <div className='update'>
                        <button className="button is-success is-outlined is-rounded" onClick={handleUpdate}>Update</button>
                    </div>
                </section>
            </div>
        </div>
    );
}
