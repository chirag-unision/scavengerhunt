const express = require('express');
const router = express.Router();

// Route: POST /
router.post('/', (req, res) => {
  const { riddleid, ans, score, teamid }= req.body;
  const db= req.db;
  const riddles= db.riddles;
  const teams= db.teams;

  riddles.findOne({
    where: { id: riddleid, riddlecode: ans }
  })
  .then((item) => {
    if(item!==null) {      
      teams.update({ teamscore: score.toString() }, {
        where: { teamid: teamid }
      })
      teams.findOne({
        where: { teamid: teamid }
      })
      .then((response)=> {
        arr= JSON.parse(response.dataValues.riddlesnotvisited)
        index= arr.indexOf(riddleid);
        arr.splice(index, 1);
        teams.update({ riddlesnotvisited: JSON.stringify(arr) }, {
          where: { teamid: teamid }
        })
        .then(()=> {
          res.send({status: 100});
        })
      })
    } else {
      res.send({status: 101});
    }
  })
  .catch((error) => {
    console.error('Error retrieving students:', error);
  });

  // res.send('Hello, You are calling the getClubs api');
});

module.exports = router;