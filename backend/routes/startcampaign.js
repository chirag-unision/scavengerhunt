const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: GET /
router.post('/', (req, res) => {
  const {teamsData}= req.body;
  const db= req.db;
  const teams= db.teams;

    teams.bulkCreate()
    .then(() => {
        res.send({status: 100});
    })
    .catch(() => {
        res.send({status: 101});
    });

});

module.exports = router;