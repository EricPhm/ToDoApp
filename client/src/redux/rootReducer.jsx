import { combineReducers } from "redux";

import missionTaskReducer from "./MissionTasks/MissionTasks";
import LoginStatusReducer from "./loginStatus/loginStatus";

const rootReducer = combineReducers({
    mission_task: missionTaskReducer,
    loginStatus: LoginStatusReducer
})

export default rootReducer;