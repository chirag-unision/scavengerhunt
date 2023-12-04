const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

// Route: POST /
router.post('/', (req, res) => {
  const { id, password }= req.body;
  const db= req.db;
  const campaign= db.campaign;
  const admin= db.admin;
  const teams= db.teams;
  
  admin.findOne({
    where: { id: id, password: password }
  })
  .then((user) => {
    if(user!==null) {  
        campaign.findOne({
            where: { admin_id: id, status: 'on' }
        })
        .then((user) => {
        if(user!==null) {  
            campaign.update({ status: 'off' }, {
                where: { admin_id: id, status: 'on' }
            })
            // teams.destroy({ where: {}, truncate: true })
            // .then(()=> {
            //     res.send({status: 100, msg: 'Everything is fine!'});
            // })
            // .catch(()=> {
            //     res.send({status: 101, msg: 'Something went wrong!'});
            // })
            res.send({status: 100, msg: 'Everything is fine!'});
        } else {
            res.send({status: 101, msg: 'Something went wrong!'});
        }
        })
        .catch((error) => {
            console.error('Error retrieving students:', error);
        });

    } else {
        res.send({status: 101, msg: 'Something went wrong!'});
    }
  })
  .catch((error) => {
    console.error('Error retrieving students:', error);
  });

});

module.exports = router;