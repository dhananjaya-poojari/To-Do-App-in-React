import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState,useEffect } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router,Route} from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks]=useState([])



  useEffect(()=>{
    const getTasks=async()=>{
      const taskFromServer=await fetchtasks();
      setTasks(taskFromServer)
    }
    getTasks();   
  },[])

//Fetch task
const fetchtasks=async()=>{
  const res= await fetch('https://brave-murdock-46d903.netlify.app/.netlify/functions/server')
  const data= await res.json();
  return data;
}

//Fetch single  task
const fetchtask=async(id)=>{
  const res= await fetch(`https://brave-murdock-46d903.netlify.app/.netlify/functions/server/${id}`)
  const data= await res.json();
  return data;
}

//Toggele reminder
const toggleReminder=async (id)=>{
    const taskToToggele=await fetchtask(id)
    const upTask = { ...taskToToggele,
        reminder:!taskToToggele.reminder }

  const res =await fetch(`https://brave-murdock-46d903.netlify.app/.netlify/functions/server/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(upTask),
  })

  const data=await res.json();

  setTasks(
    tasks.map((task)=> 
    task._id===id ? {...task,reminder:data.reminder }:task
    )
    )
}

//Add task
const addtask=async (task)=>{
  // const id=Math.random();
  // const newtask={id,...tasks};
  // setTasks([...tasks,newtask]);

  const res=await fetch(`https://brave-murdock-46d903.netlify.app/.netlify/functions/server`,
  {
    method:'POST',
    headers:{
      'Content-type': 'application/json',
    },
    body:JSON.stringify(task)
  })
   
  const data= await res.json();

  setTasks([...tasks,data]);
};

//Delete task
const deleteTask=async (id)=>  {
  await fetch(`https://brave-murdock-46d903.netlify.app/.netlify/functions/server/${id}`,{
    method:'Delete'
  })
  setTasks(tasks.filter(task=>task._id!==id));
  //getTasks();
}

  return (
    <Router>
    <div className="container">
      <Header title="Task tracker" 
        onClick={()=>setShowAddTask(!showAddTask)} 
        showAddTask={showAddTask}></Header>
      <Route path='/' exact render={(props)=>(
        <>
        {showAddTask && <AddTask onAdd={addtask}/>}
        {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ):('No task')}
        </>
      )} />
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
