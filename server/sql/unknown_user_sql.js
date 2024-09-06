// this pool object is provides a connection to MySQL database
const pool = require("../mysql");

// work
async function getAllMissions(){
    const connection = await pool
    const [results] = await connection.execute(
        'SELECT Name, DateApply FROM MISSION'
    )
    if(results.length > 0){
        return results.map(data => ({
            Name: data.Name,
            DateApply: data.DateApply.toISOString().split('T')[0]
            // To detach the 2024-08-17[T07:00:00.000Z]
        }))
    } else {
        return []
    }
}



module.exports = {
    getAllMissions
}