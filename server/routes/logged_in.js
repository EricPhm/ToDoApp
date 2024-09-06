
var express = require('express');
var router = express.Router();

const { getUserId } = require('../models/auth_token_cache')

const loggedIn_Dao = require('../sql/logged_in_sql')

// Middleware to check if the user is authenticated via the token
async function checkUserToken(req, res, next) {
    const tokenFromCookie = req.cookies.AuthToken;

    if (!tokenFromCookie) {
        return res.status(401).send("No token found in cookie");
    }
    // check if token is valid
    const userName = getUserId(tokenFromCookie); 
    if (!userName) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
     // update time for token in cookies for every time clicking on routes
    // res.cookie("AuthToken", tokenFromCookie, { maxAge: 1000 * 60 * 60 * 24 })
    // go to the next handlers or middleware
    next();    
}
    
    
// Route to check if the cookie is still valid
router.get('/checkCookie', checkUserToken, (req, res) => {
    return res.sendStatus(200); // Send status 200 to indicate that the token is valid
});


// get all mission
router.get('/', checkUserToken, async(req, res) => {
    const token = req.cookies.AuthToken
    const UserName = getUserId(token);
    if (!UserName) {
        return res.status(400).send("Error: UserName is undefined or null");
    }
    try {
        // get users mission for current day
        const missions_retrieved = await loggedIn_Dao.getUserMission(UserName)
        if(missions_retrieved.length > 0) {
            return res.status(200).send(missions_retrieved)
        } else {
            return res.status(200).send([])
        }
    } catch (e) {
        return res.status(404).send("Error: " + e.message)
    }
})




// add a mission
router.post('/add_mission', checkUserToken, async(req, res) => {
    // could add DateApply if wanted
    const { Name } = req.body
    const UserName = getUserId(req.cookies.AuthToken)

    const addMission = await loggedIn_Dao.addMission({Name, UserName})

    if(!addMission){
        return res.status(403).send('ERROR: Cannot add mission')
    }
    return res.status(200).send('Mission added successfully')
})



// get tasks from a mission
router.get('/:missionId/tasks', checkUserToken, async (req, res) => {
    const { missionId } = req.params

    try {
        // get tasks for mission 
        const tasks = await loggedIn_Dao.getTasksForMission(missionId)

        if(tasks.length > 0) {
            return res.status(200).send(tasks)
        } else {
            // Return an empty array if no tasks are found
            return res.status(200).send([]);
        }
    } catch (e) {
        return res.status(404).send("Error: " + e.message)
    }

})

// add task to mission
router.post('/:missionId/addTask', checkUserToken, async (req, res) => {
    const { missionId } = req.params
    const { Name, Description } = req.body

    const addTask = await loggedIn_Dao.addTasks({Name, Description, missionId})
    if(!addTask){
        return res.status(404).send('ERROR: Can not add task')
    } 
    return res.status(200).send(addTask)
})

// update task status
router.patch('/task/:taskId', checkUserToken, async (req,res) => {
    const { taskId } = req.params
    const status = req.body.status

    if(status !== 1 && status !== 0){
        return res.status(404).send('status must be TRUE:1 or FALSE:0' + status) 
    }

    const hasTask = await loggedIn_Dao.getTask(taskId)
    if(hasTask.length === 0) {
        return res.status(300).send('Task not found to update')
    }

    const updateTaskStatus = await loggedIn_Dao.updateTasks({status, taskId})
    if(!updateTaskStatus) {
        return res.status(404).send('Cannot update task status')
    }
    return res.status(200).send('Task updated successfully')
    // {
    //     "status": 0
    // }
})


module.exports = router;




/*

// header methods
// Middleware to check if the user is authenticated via the token
async function checkUserToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send("Unauthorized: Token missing or malformed");
    }

    const token = authHeader.split(' ')[1];  // Extract the token from the header

    // check token if not expired 
    if(token !== res.cookies.AuthToken){
        return res.status(401).send("Unauthorized: Token expired " + res.cookies.AuthToken + " " + token);
    }

    const userName = getUserId(token);  // Your function to validate the token
    if (!userName) {
        return res.status(401).send("Unauthorized: Invalid token");
    }

    // Extend the cookie's expiration time
    res.cookie("AuthToken", req.cookies.AuthToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    // Proceed to the next middleware or route handler
    next();
    
}
    



// get all mission - header: authorization
router.get('/', checkUserToken, async(req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];  // Extract the token from the 
    const UserName = getUserId(token);
    if (!UserName) {
        return res.status(400).send("Error: UserName is undefined or null");
    }
    try {
        // get users mission for current day
        const missions_retrieved = await loggedIn_Dao.getUserMission(UserName)
        if(missions_retrieved.length > 0) {
            return res.status(200).send(missions_retrieved)
        } else {
            return res.status(200).send("No mission found for current day")
        }
    } catch (e) {
        return res.status(404).send("Error: " + e.message)
    }
})

*/