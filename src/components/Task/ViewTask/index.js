import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import moment from 'moment';
import { Dropdown}  from '../../ReusableComponents/dropdown';

export default function ViewTask({ setModal, item, fetchTask }) {
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState("");
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
        <div id="backdrop" className="backdrop">
            <div className="modal">
                <div className='modal-top'>
                    <div><h2>Task Details</h2></div>
                    <div><button onClick={handleCloseView}>close</button></div>
                </div>
                <div className='task-details'>
                    <div className='name'>
                        <h3>Title: </h3>
                        <input placeholder='updated title' 
                            onChange={(e) => handleUpdatedTitle(e.target.value)}
                            value={updatedTitle === "" ? item.task_title : updatedTitle}
                        />
                    </div>
                    <div className='assigned-user'>
                        <h3>Assigned to: </h3>
                        <p>{item.task_assigned_user}</p>
                    </div>
                    <div className='status'>
                        <h3>Status: </h3>
                        <Dropdown buttonDefaultText={item.task_status} options={statusValues}/>
                    </div>
                    <div className='deadline'>
                        <h3>Deadline: </h3>
                        <p>{moment(item.task_deadline).format('MMMM Do YYYY')}</p>
                    </div>
                </div>
                <div>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
}
