const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretKey= '8ef03ny423f07fh3f';
// Route: POST /
router.post('/', (req, res) => {
  const { mobile, pass }= req.body;
  const db= req.db;
  const teams= db.teams;

  teams.findOne({
    where: { mobile: mobile, password: pass }
  })
  .then((user) => {
    if(user!==null) {      
      const token = jwt.sign({ mobile: mobile }, secretKey, { expiresIn: '12h' });
      res.send({
        status: 100, 
        token: token, 
        teamid: user.dataValues.teamid, 
        teamname: user.dataValues.teamname, 
        teamscore: user.dataValues.teamscore, 
        freezeTime: user.dataValues.freezeTime, 
        msg: 'Hello, You are calling the login api. Your mobile no. is '+mobile});
    } else {
      res.send({status: 101});
    }
  })
  .catch((error) => {
    console.error('Error retrieving students:', error);
  });

});

module.exports = router;