const express = require('express');
const router = express.Router();

// Route: POST /
router.post('/', (req, res) => {

  res.send('Hello, You are calling the getClubs api');
});

module.exports = router;