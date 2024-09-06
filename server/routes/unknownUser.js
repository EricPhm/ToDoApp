var express = require('express');
var router = express.Router();
// imports a module named unknown_userDao from a file named unknown_user_sql.js
// unknown_userDao contains functions to handle database operations
const unknownUser_Dao = require('../sql/unknown_user_sql')

/* GET users listing. */
router.get('/all_mission', async (req, res) => {

  const missions = await unknownUser_Dao.getAllMissions()

  if(missions.length < 0){
    res.status(404).send("No mission yet available")
    return
  }
  return res.send(missions);
});

module.exports = router;
