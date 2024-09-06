
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import HomeCSS from '../css/home.module.css'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/'
})

/*
TODO: 
add mission
add about page
*/


function Home() {
  const [missions, setMissions] = useState([])
  const [tasks, setTasks] = useState({}) // {} -> task is an object| ex: task1: { id: 1, text: "Buy groceries", completed: false },...
  // const [addMission, setAddMission] = useState(false)
  useEffect(() => {
    const fetchMissions = async() => {
        try {
            const res = await api.get('/user/',{ withCredentials: true });            
            setMissions(res.data); // Use the data directly from res.data
        } catch (err) {
            console.error('Error fetching missions:', err);
        }
    }
    fetchMissions();
  }, []);// Run only once on component mount

  useEffect(() => {
    const fetchTasks = async(missionId) => {
      try {
        const res = await api.get(`/user/${missionId}/tasks`, { withCredentials: true });
        setTasks(prevTasks => ({
          ...prevTasks, // prevMissionId's tasks
          [missionId]: res.data
        }));
      } catch (err) {
        console.error('Error fetching missions :', err);
      }
    }

    if (missions.length > 0) {
      missions.forEach(mission => {
        fetchTasks(mission.Id)
      })
    }
  }, [missions])// Run when missions are updated

  // call back function if successfully add task
  // update task when task is added
  const updateTaskAfterAdd = (missionId, newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [missionId]: [...prevTasks[missionId], newTask]
    }))
  }

  return (
    <div>
      <div className={HomeCSS.home_container}>
        <div className={HomeCSS.data_container}>
          {
            missions.map((mission) => (
              <details open key={mission.Id} className={HomeCSS.mission_container}>
                 {/* <AddTask value={mission.Id} onTaskAdded={updateTaskAfterAdd}>
                      + Task
                    </AddTask> */}
                <summary>{mission.Name} 
                  <AddTask value={mission.Id} onTaskAdded={updateTaskAfterAdd}>
                      + Task
                    </AddTask>
                </summary>
                <ul>
                  {Array.isArray(tasks[mission.Id]) ? (
                    tasks[mission.Id].map(task => (
                      <li key={task.Id}>
                        <div>
                          <CustomButton initialActive={task.Done} value={task.Id}>{task.Name}</CustomButton>
                        </div>
                        -- {task.Description}
                      </li>
                    ))
                  ) : (
                    <li> No task available</li>
                  )}
                </ul> 
              </details>
            ))
          }
        </div>
        <div className={HomeCSS.btn_container}>
          <button>Add Mission</button>
        </div>
      </div>
    </div>
  )
}

// add Task
// call back function onTaskAdded if task added successfully
function AddTask({ value, onTaskAdded, ...props }) {
  const [BtnActive, setBtnActive] = useState(false)
  const [Name, setName] = useState()
  const [Description, setDescription] = useState()

  const handleBtnActive = () => {
    setBtnActive(!BtnActive)
  }

  const addTask = async(e) => {
    e.preventDefault();

    const missionId = value
    try {
      let res = await api.post(
        `/user/${missionId}/addTask`,
        {
            Name: Name,
            Description: Description
        },
        { withCredentials: true }
    );
    if(res.status === 200){
        console.log(res.status)
        setBtnActive(!BtnActive)
        // Assuming res.data returns the newly added task
        onTaskAdded(missionId, res.data); 
    }
    } catch (err) {
      console.error("Error adding task: " + err)
    }
  }
  return (
    <div>
      { 
        BtnActive === false ?
        <button className={HomeCSS.addTask_btn} onClick={handleBtnActive} {...props}>+ Task</button>
        : 
        (<div>
          <br></br>

          <form onSubmit={addTask}>
            <div>
              <label htmlFor="TaskName">Name: </label>
              <input type="text" 
                id='TaskName'
                name='TaskName'
                placeholder='Enter task name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
            <label htmlFor="Description">Description: </label>
              <input type="text" 
                id='Description'
                name='Description'
                placeholder='Enter description'
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button disabled={!Name || !Description}>Add</button>
          </form>
          <button onClick={handleBtnActive}>X</button>
        </div>)
      }
    </div>
  )
}


function CustomButton({ initialActive, value, children, ...props }) {
  const [done, setDone ] = useState(Number(initialActive))

  const handleDone = async() => {
    const boolDone = done === 0 ? 1 : 0
    try {
      let res = await api.patch(`/user/task/${value}`, {
        "status": boolDone
      })
      if(res.status === 200){
        console.log(res.status)
      }
    
    } catch (error) {
      console.error("Error updating task: " + error)
    }
    setDone(boolDone)
  }

  return (
    <button
      className={(done === 1) ? HomeCSS.done_button_active : HomeCSS.done_button}
      onClick={handleDone}
      {...props}  // Spread the rest of the props to the button element
    >
      {children}
    </button>
  );
}

export default Home


/* this is how fetch data look like
{
  mission1: {
    name: "Mars Exploration",
    status: "In Progress",
    crew: ["John", "Jane", "Bob"],
    objectives: [
      { id: 1, description: "Land on Mars", completed: false },
      { id: 2, description: "Collect soil samples", completed: false },
      { id: 3, description: "Search for water", completed: false }
    ],
    launchDate: "2025-07-15",
    estimatedDuration: "2 years"
  },
  // ... other missions
}
*/