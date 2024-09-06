
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissionRequest, fetchTaskRequest, setLoading, fetchDataFailure, setLastFetched } from '../redux/MissionTasks/MissionTasks';

import axios from 'axios';


const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/'
})

// working, but for fetch mission but not for task
function ReduxHome() {
    const dispatch = useDispatch();
    const missions = useSelector((state) => state.missions);
    const tasksByMissionId = useSelector((state) => state.tasksByMissionId);
    
    useEffect(() => {
        const fetchMissions = async () => {
            dispatch(setLoading(true));
            try {
            const res = await api.get('/user/', { withCredentials: true });
            dispatch(fetchMissionRequest(res.data));
            dispatch(setLastFetched(Date.now())); // Update timestamp
            } catch (err) {
            dispatch(fetchDataFailure('Error fetching missions'));
            console.error('Error fetching missions:', err);
            } finally {
            dispatch(setLoading(false));
            }
        };
    
        fetchMissions();
    }, [dispatch]);
    

    useEffect(() => {
        const fetchTasks = async (missionId) => {
          try {
            const res = await api.get(`/user/${missionId}/tasks`, { withCredentials: true });
            dispatch(fetchTaskRequest(missionId, res.data));
          } catch (err) {
            dispatch(fetchDataFailure('Error fetching tasks'));
            console.error('Error fetching tasks:', err);
          }
        };
    
        if (missions && missions.length > 0) {
          missions.forEach((mission) => {
            console(mission)
            fetchTasks(mission.Id);
          });
        }
      }, [missions, dispatch]);

    console.log(missions, tasksByMissionId)

    return (
    <div>
      HELLO
    </div>
  )
}

export default ReduxHome
