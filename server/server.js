const express = require('express');
const app = express(); // create app instance
const cors = require('cors');
const corsOptions = { // only available for this host
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));



app.get('/api', (req,res) => {
    res.status(200).json({fruits: ["apple", "orange", "banana","cocoa"] })
})



app.listen(8080, () => {
    console.log('listening on port 8080');
})