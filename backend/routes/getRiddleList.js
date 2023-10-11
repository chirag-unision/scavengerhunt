const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: GET /
router.get('/', (req, res) => {
  const teamid= req.query.teamid;
  const score= parseInt(req.query.score);
  console.log(score);
  const db= req.db;
  const teams= db.teams;
  const riddles= db.riddles;

  const snakeArr= [37,56,75,98];
  const snakeReach= [14,20,50,63];

  const ladderArr= [13,23,52,61];
  const ladderReach= [35,64,94,83];

  let upperLim= score+15;
  let lowerLim= score+5;

  if(upperLim>100) {
    upperLim= 100;
    lowerLim= score+1;
  }

  array= [];
  array2= [];
  let i= 0;
  let check1= true;
  let check2= true;

  while(i<4) {
      if(snakeArr[i]>=lowerLim && snakeArr[i]<=upperLim && check1) {
          array.push(snakeArr[i]);
          array2.push(snakeReach[i]);
          check1= false;

      }

      if(ladderArr[i]>=lowerLim && ladderArr[i]<=upperLim && check2) {
          array.push(ladderArr[i]);
          array2.push(ladderReach[i]);
          check2= false;
      }
      i++;
  }
  while(array.length<3) {
    random_no= Math.floor(Math.random()*(upperLim-lowerLim+1))+parseInt(lowerLim);
    if(!array.includes(random_no)) {
      array.push(random_no);
      array2.push(random_no);
    }
  }

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
        res.send({status: 100, data: data, pointsData1: array, pointsData2: array2});
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