import React, {useState, useEffect} from 'react'
import "./style.scss"
import AddProject from './AddProject'
export default function Project() {

  const [data, setData] = useState([{}])
  const [modalOn, setModal] = useState(false)

  const url = '/projects'
  const params = new URLSearchParams({ 
    user_id : 31
  });
  const handleAddProject = ()=>{
    setModal(true);
  }
  const fetchProjects = ()=>{
    fetch(`${url}?${params}`).then(
      res => res.json()
    ).then(
      res => 
        {
          setData(res.data)
          console.log(res.data)
        }
    )
  }
  useEffect (()=>{
    fetchProjects();
  }, [])

  return (
    <div className='project-container'>
      <button className="button is-success" onClick={()=>handleAddProject()}>Create Project</button>
      {
        modalOn && <AddProject setModal={setModal} fetchProjects={fetchProjects}/> 
      }
      {
        data.map((item, i) => (
          <div className='project-item box'>
            <div className='project-name'>
              <h3 key={`name-${i}`}>{item.project_name} </h3>
            </div>
            <div className='project-description'>
              <p key={`desc-${i}`}>{item.project_description}</p> 
             </div>        
            <div className='view-project'>
              <a href={`projects/${item.project_id}`}> View Project</a>
              </div>

          </div>
        )
      )}
    </div>
  )
}
