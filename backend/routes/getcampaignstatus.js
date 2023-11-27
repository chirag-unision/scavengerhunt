const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: POST /
router.post('/', (req, res) => {
  const { id }= req.body;
  const db= req.db;
  const campaign= db.campaign;

  campaign.findOne({
    where: { admin_id: id, status: 'on' }
  })
  .then((user) => {
    if(user!==null) {  
        res.send({status: 100, msg: 'Everything is fine!'});
    } else {
        res.send({status: 101, msg: 'Something went wrong!'});
    }
  })
  .catch((error) => {
    console.error('Error retrieving students:', error);
  });

});

module.exports = router;