const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: POST /
router.post('/', (req, res) => {
  const db= req.db;
  const teams= db.teams;

  teams.findAll({
    order: [["teamscore", "DESC"]],
  })
  .then((data)=> {
    res.send({status: 100, data: data});
  })
  .catch((error) => {
    res.send({status: 101});
  })

});

module.exports = router;