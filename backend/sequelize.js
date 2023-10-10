const Sequelize= require('sequelize');

const sequelize= new Sequelize('u977092243_chirag', 'u977092243_chirag', 'Chirag@1226', {
    host: 'srv873.hstgr.io',
    dialect: 'mysql',
    port: 3306
});

sequelize.authenticate().then(()=> {
    console.log('Connected')
})
.catch(err => {
    console.error('Unable to connect to the database:', err)
})

module.exports= sequelize;