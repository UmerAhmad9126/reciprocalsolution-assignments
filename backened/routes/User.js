//Import the required modules
const express = require('express');
const router = express.Router();

const {
    login,
    signup, 
    
} = require("../controller/Auth");

router.post('/login', login);

//Route for user signup
router.post('/signup', signup);

//Export the router for use in the main application
module.exports = router;

