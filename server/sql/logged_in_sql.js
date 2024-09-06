

const pool = require('../mysql');


// add mission
async function addMission (mission) {
    const connection = await pool
    const [result] = await connection.execute(
        'INSERT INTO MISSION (Name, UserName, DateApply) VALUES (?,?, CURDATE())',
        [mission.Name, mission.UserName]
    )
    return result
}


// get mission for specific user
async function getUserMission (user){
    const connection = await pool
    const [result] = await connection.execute(
        // 'SELECT Id, Name FROM MISSION WHERE UserName = ? AND DateApply = CURDATE()',
        'SELECT Id, Name FROM MISSION WHERE UserName = ? AND DateApply = ?',
        [user, '2024-08-20']
    )
    // IF no data
    if(result.length <= 0){
        return []
    }
    return result.map(mission => ({
        Id: mission.Id,  // Note the uppercase 'I'
        Name: mission.Name  // Note the uppercase 'N'
    }));
}


// should call for mission's Id where UserName, DateApply, Name
//??????????????

// add tasks
async function addTasks (task) {
    const connection = await pool
    const [insertResult] = await connection.execute(
        'INSERT INTO TASK (Name, Description, MissionId) VALUES (?,?,?)',
        [task.Name, task.Description, task.missionId]
    )
    // If the insert was successful, fetch the newly added data
    if (insertResult.affectedRows === 1) {
        const [rows] = await connection.execute(
            'SELECT * FROM TASK WHERE Id = ?',
            [insertResult.insertId]
        );
        
        // Return the first (and only) row
        return rows[0];
    } else {
        return undefined
    }
}

// get all tasks for a mission
async function getTasksForMission(missionId){
    const connection = await pool
    const [results] = await connection.execute(
        'SELECT Id, Name, Description, Done FROM TASK WHERE MissionId = ?',
        [missionId]
    )
    if(results.length <= 0){
        return []
    }
    return results.map(task => ({
        Id: task.Id,
        Name: task.Name,
        Description: task.Description,
        Done: task.Done
    }))

}

// get task to check if existed
async function getTask(task){
    const connection = await pool
    const [result] = await connection.execute(
        'SELECT * FROM TASK WHERE Id = ?',
        [task]
    )
    if( result.length > 0 ){
        return result[0]
    }
    return []
}

// update tasks if done
async function updateTasks(task) {
    const connection = await pool
    const [result] = await connection.execute(
        'UPDATE TASK SET Done = ? WHERE Id = ?',
        [task.status, task.taskId]
    )
    // if update succeeds, row affected
    if(result.affectedRows > 0){
        return true
    } else {
        return false
    }
}




module.exports = {
    addMission,
    getUserMission,
    addTasks,
    getTasksForMission,
    getTask,
    updateTasks
}

