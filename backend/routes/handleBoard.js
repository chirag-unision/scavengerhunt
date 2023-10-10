const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: GET /
router.get('/', (req, res) => {
  const score= req.query.score;
  const db= req.db;
//   const teams= db.teams;
//   const riddles= db.riddles;
    const snakeArr= [37,56,75,99];
    const snakeReach= [14,20,50,63];

    const ladderArr= [13,23,52,61];
    const ladderReach= [35,64,94,83];

    const upperLim= score+15;
    const lowerLim= score+5;

    arr= [];
    arr2= [];
    let i= 0;
    let check1= true;
    let check2= true;
    while(i<4) {
        if(snakeArr[i]>=lowerLim && snakeArr[i]<=upperLim && check1) {
            arr.push(snakeArr[i]);
            arr2.push(snakeReach[i]);
            check1= false;

        }

        if(ladderArr[i]>=lowerLim && ladderArr[i]<=upperLim && check2) {
            arr.push(ladderArr[i]);
            arr2.push(ladderReach[i]);
            check2= false;
        }
    }
    arr.push()
    arr2.push()

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