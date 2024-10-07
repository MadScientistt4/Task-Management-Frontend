import React, { useState, useEffect } from 'react';
import "./style.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import AddTask from '../../Task/AddTask';
import ViewTask from "X:/project/TaskForge/TaskForge-frontend/src/components/Task/ViewTask";

export default function ViewProject() {
  const [data, setData] = useState([]);
  const [statusData, setStatusData] = useState({
    Pending: [],
    In_Progress: [],
    Completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOn, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [task, setTask] = useState(null)
  const { id } = useParams();
  const url = `http://localhost:5000/projects/${id}/tasks`;
  const params = new URLSearchParams({
    user_id: 31,
  });
  const handleViewTask = (item) => {
    setViewModal(true);
    setTask(item);
  }
  const handleAddTask = () => {
    setModal(true);
  };
  const fetchTasksInProject = async () => {
    try {
      const res = await axios.get(`${url}?${params}`);
      console.log(res.data); 
      if (res.data && Array.isArray(res.data.data)) {
        const tasks = res.data.data;
        setData(tasks);
        console.log(tasks);

        let statusDataTemp = {
          Pending: [],
          In_Progress: [],
          Completed: [],
        };

        tasks.forEach((item) => {
          if (item.task_status === 'PENDING') statusDataTemp.Pending.push(item);
          if (item.task_status === 'IN_PROGRESS') statusDataTemp.In_Progress.push(item);
          if (item.task_status === 'DONE') statusDataTemp.Completed.push(item);
        });

        setStatusData(statusDataTemp);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasksInProject();
  }, []);

  if (loading) return <p>...LOADING</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='task-container'>
      <h1 className='title' style={{margin: '20px'}}>Task Board</h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button
          onClick={handleAddTask}
          className='button is-success'
          style={{margin: '10px'}}
        >
          Add Task
        </button>
      </div>

      {modalOn && <AddTask modalOn={modalOn} setModal={setModal} fetchTasksInProject={fetchTasksInProject} />}
      {viewModal && <ViewTask modalOn={viewModal} setModal={setViewModal} item={task} fetchTask={fetchTasksInProject} />}

      <div className='all-tasks'>
        {Object.keys(statusData).map((key) => (
          <div className='tasks-status-division' key={key}>
            <div className='heading'>
              <h2>{key}</h2>
            </div>
            {statusData[key].map((item, i) => (
              <div className='project-task-item' onClick={() => handleViewTask(item)}>

                <div className='project-task-item-top' key={`task-${i}`}>
                  <div className='project-task-name'>
                    <h3>{item.task_title}</h3>
                  </div>
                  <div className='task-assigned-user'>
                    <p>{item.task_assigned_user}</p>
                  </div>
                </div>

                <div className='task-deadline'>
                  <p>{moment(item.task_deadline).format('MMMM Do YYYY')}</p>
                </div>

              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
