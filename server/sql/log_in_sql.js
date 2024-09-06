

const pool = require('../mysql');


// check userName if exist
async function checkUserName(user){
    const connection = await pool
    const [result] = await connection.execute(
        'SELECT userName FROM USER WHERE userName = ?',
        [user]
    )
    if(result.length === 0){
        return false
    }
    // userName exist
    return true
}


// get the password of the user from database to compare
async function getUserPassword(user) {
    const connection  = await pool
    const [result] = await connection.execute(
        'SELECT Password FROM USER WHERE UserName = ?',
        [user]
    )
    return result[0].Password
}


// add a new user to the pool
async function addUser(user) {
    const connection = await pool
    const [result] = await connection.execute(
        'INSERT INTO USER (UserName, Password) VALUES (?, ?)',
        [user.UserName, user.Password]
    )
    return result.userName
}



module.exports = {
    getUserPassword,
    checkUserName,
    addUser
}