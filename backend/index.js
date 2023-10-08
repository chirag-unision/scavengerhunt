const express= require('express')
const app= express()
const port= 3200

//Route s
const LoginRoute= require('./routes/login')
const GetRiddleListRoute= require('./routes/getRiddleList')
const GetRiddleRoute= require('./routes/login')
const CheckRiddleRoute= require('./routes/login')

const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./sequelize');

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

const db= {}; 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teams= require('./modals/Teams')(sequelize, DataTypes);
db.riddles= require('./modals/Riddles')(sequelize, DataTypes);

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hey there! This is uccda backend.');

    // db.teams.create({ teamid: "TEAM002", teamname: "ChintuTeam", teamlead: "Chintu", email: "chintu12@gmail.com", mobile: "8478767676", password: "chi847", teamscore: 0, riddlesnotvisited: "[1,2,3,4,5]" })
    // .then((newUser) => {
    //   console.log('New student created:', newUser.toJSON());
    // })
    // .catch((error) => {
    //   console.error('Error creating student:', error);
    // });

    // db.riddles.create({ rid: "RID005", description: "teetr ke na aage teetr, teetr ke na piche teetr. Bolo kitne teetr.", riddlecode: "P" })
    // .then((newUser) => {
    //   console.log('New student created:', newUser.toJSON());
    // })
    // .catch((error) => {
    //   console.error('Error creating student:', error);
    // });
});

function middleDB(req, res, next) {
  req.db = db;
  next();
}

app.use('/login', middleDB, LoginRoute);
app.use('/riddlelist', middleDB, GetRiddleListRoute);
app.use('/riddle', middleDB, GetRiddleRoute);
app.use('/checkriddle', middleDB, CheckRiddleRoute);

app.use((req, res) => {
    res.status(404).send('Not found!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
