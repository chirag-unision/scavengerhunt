const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretKey= '8ef03ny423f07fh3f';
// Route: POST /
router.post('/', (req, res) => {
  const { email, password }= req.body;
  const db= req.db;
  const admin= db.admin;

  admin.findOne({
    where: { email: email, password: password }
  })
  .then((user) => {
    if(user!==null) {      
      const token = jwt.sign({ email: email }, secretKey, { expiresIn: '24h' });
      res.send({
        status: 100, 
        token: token, 
        adminid: user.dataValues.id, 
        msg: 'Hello, You are calling the admin login api. Your email is '+email});
    } else {
      res.send({status: 101});
    }
  })
  .catch((error) => {
    console.error('Error retrieving students:', error);
  });

});

module.exports = router;