const express = require('express')
const router = express.Router();

router.post('/clothData', (req, res) => {
    try {
        res.send([global.clothCategory, global.clothData])    //we are taking it in array so that it can be used later in array form (used in Home.js)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;