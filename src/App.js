import {Routes, Route} from 'react-router-dom'
import  Home  from './components/Home'
import Project  from './components/Project'
import ViewProject  from './components/Project/ViewProject'
import { Navbar } from './components/NavBar/Nav';
import { Task } from './components/Task/Task';
import { Team } from './components/Teams/Team';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='project' element={<Project/>}></Route>
        <Route path='projects/:id' element={<ViewProject/>}></Route>
        <Route path='task' element={<Task/>}></Route>
        <Route path='team' element={<Team/>}></Route>
      </Routes>
    </>
  );
}

export default App;
