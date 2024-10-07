import React, { useState, useEffect } from 'react';
import "./style.scss";
import ViewTask from "X:/project/TaskForge/TaskForge-frontend/src/components/Task/ViewTask";

export default function Home() {
  const [data, setData] = useState([{}]);
  const [modalOn, setModal] = useState(false);
  const [task, setTask] = useState(null);
  const url = '/tasks';
  const params = new URLSearchParams({
    user_id: 31
  });

  const handleViewTask = (item) => {
    setModal(true);
    setTask(item);
  };

  const fetchUserTask = () => {
    fetch(`${url}?${params}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    fetchUserTask();
  }, []);

  return (
    <div className='tasks-container'>
      <h2 className='title is-'>My Tasks</h2>
      {modalOn && <ViewTask modalOn={modalOn} setModal={setModal} item={task} fetchTask={fetchUserTask}/>}
      {data.map((item, i) => (
        <div key={i} className="task-item box" onClick={() => handleViewTask(item)}>
          <div>
            <div className='task-title'>
              <h3>{item.task_title}</h3>
            </div>
            <div className='project-status'>
              <p>{item.task_assigned_user}</p>
            </div>
          </div>
          <div className='view-project'>
            <p>{item.task_status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
