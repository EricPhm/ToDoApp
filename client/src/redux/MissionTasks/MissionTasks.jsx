

const FETCH_MISSION_REQUEST = 'FETCH_MISSION_REQUEST'
const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
const SET_LOADING = 'SET_LOADING';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
const SET_LAST_FETCHED = 'SET_LAST_FETCHED';


const initialState = {
    missions: [],
    tasksByMissionId: {},
    loading: false,
    error: null,
    lastFetched: null,
};

//actions
export const fetchMissionRequest = (missions) => {
    return {
        type: FETCH_MISSION_REQUEST,
        payload: missions
    }
}

export const fetchTaskRequest = (missionId, tasks) => {
    return {
        type: FETCH_TASKS_REQUEST,
        payload: {missionId, tasks}
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    }
}

export const fetchDataFailure = (error) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}


export const setLastFetched = (timestamp) => ({
    type: SET_LAST_FETCHED,
    payload: timestamp
})



// reducer
const missionTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MISSION_REQUEST:
            return {
                ...state,
                missions: action.payload,
                lastFetched: Date.now()
            }
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                tasksByMissionId: {
                    ...state.tasksByMissionId,
                    [action.payload.missionId]: action.payload.tasks
                }
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case SET_LAST_FETCHED:
            return {
                ...state,
                lastFetched: action.payload
            }
        default:
            return state
    }
}

export default missionTaskReducer

