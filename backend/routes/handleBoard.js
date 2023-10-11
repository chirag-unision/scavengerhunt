const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: GET /
router.post('/', (req, res) => {
  const {teamid, freezeTime}= req.body;
  const db= req.db;
  const teams= db.teams;

  teams.update({freezeTime: freezeTime}, {
    where: { teamid: teamid }
  })
  .then(()=> {
    res.send({status: 100});
  })
  .catch(()=> {
    res.send({status: 101});
  })

});

module.exports = router;