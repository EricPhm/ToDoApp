

var express = require('express');
var router = express.Router();
// bcrypt password
const bcrypt = require('bcrypt');
// generate ran token
const { v4: uuidv4 } = require('uuid')
// Your Data Access Object (DAO) for user login-related SQL operations
const logIn_Dao = require('../sql/log_in_sql')

const { addAuthToken } = require('../models/auth_token_cache')
// Function to manage auth token cache
router.get('/ee', (req, res) => {
    return res.status(200).json({fruits: ["apple", "orange", "banana","cocoa"] })
})

// {
// "UserName": "Bill",
// "UserPassword": "Bill"
// }
router.post('/', async (req,res) => {
    const UserName = req.body.UserName
    const UserPassword = req.body.UserPassword

    // check userName exist
    let boolUserName = await logIn_Dao.checkUserName(UserName)
    if (boolUserName === false) {
        return res.status(401).send("Invalid User Name or Password")
    }

    const userDBpassword = await logIn_Dao.getUserPassword(UserName)
    try {
        const match = await bcrypt.compare(UserPassword, userDBpassword)
        if(match){
            //uuidv4 generate random token
            const token = uuidv4()
            addAuthToken(token, UserName)
            // put token to cookie
            res.cookie('AuthToken', token, {maxAge: 1000 * 60 * 60 * 24}) // keep token for 1 day

            
            return res.status(200).json({ token }).send(res.cookie.AuthToken)//.send("Login successful");
        } else {
            return res.status(401).send("Incorrect password");
        }
    } catch (err) {
        return res.status(500).send('Something went wrong: ' + err.message);
    }
})


// register user
router.post('/register', async (req, res) => {
    const UserName = req.body.UserName
    const UserPassword = req.body.UserPassword

    let bool = await logIn_Dao.checkUserName(UserName)
    if(bool === true){
        return res.status(400).send('User name already in use')
    }

    try {
        // generate salt + password
        const salt = await bcrypt.genSalt()
        const Password = await bcrypt.hash(UserPassword, salt)
        // add userName and hashedPassword to database
        // the parameter name need to match with the name in log_in_sql.js
        const id = await logIn_Dao.addUser({UserName, Password})
        
        /* should be redirect back to login
        // generate token
        const token = uuidv4()
        addAuthToken(token, id)
        res.cookie('AuthToken', token, { maxAge: 1000 * 60 * 60 * 24})
        */
        return res.status(200).send(id)
    } catch (e) {
        return res.status(500).send('Some error: ' + e.message)
    }
    // {
    // "UserName": "Bill",
    // "UserPassword": "Bill"
    // }
})

module.exports = router;