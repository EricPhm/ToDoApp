

var express = require('express');
var router = express.Router();
const { deleteAuthToken, getUserId } = require('../models/auth_token_cache')


// logout- clear cache and cookies
router.post('/', (req,res) => {
    if(!req.cookies.AuthToken){
        return res.status(404).send({ message: 'AuthToken not found to log out' })
    }
    const userName = getUserId(req.cookies.AuthToken)
    if (!userName) {
        return res.status(404).send({ message: 'User not found to log out'})
        
    }
    res.clearCookie('AuthToken')
    deleteAuthToken(req.cookies.AuthToken)
    res.status(200).send({ message: 'logged out' })

})


module.exports = router
