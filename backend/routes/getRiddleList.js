const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: GET /
router.get('/', (req, res) => {
  const teamid= req.query.teamid;
  const db= req.db;
  const teams= db.teams;
  const riddles= db.riddles;

  teams.findOne({
    where: { teamid: teamid }
  })
  .then((user) => {
    if(user!==null) {  
      let arr= [];
      data= JSON.parse(user.dataValues.riddlesnotvisited);
      while(arr.length<3) {
        random_num= Math.floor(Math.random() * data.length)
        if(!arr.includes(data[random_num]))
        arr.push(data[random_num]);
      }

      let arr2= [];
      riddles.findAll({
        where: { id: arr }
      })
      .then((data)=> {
        res.send({status: 100, data: data});
      })
      .catch((error) => {
        
      })
    } else {
      res.send({status: 101, msg: 'Something went wrong!'});
    }
  })
  .catch((error) => {
    console.error('Error retrieving students:', error);
  });

});

module.exports = router;