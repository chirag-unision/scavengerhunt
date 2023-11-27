const express= require('express')
const app= express()
const port= 3200
const cors= require('cors')

//Route s
const LoginRoute= require('./routes/login')
const GetRiddleListRoute= require('./routes/getRiddleList')
const GetRiddleRoute= require('./routes/login')
const CheckRiddleRoute= require('./routes/checkRiddle')
const HandleFreeze= require('./routes/handleBoard')
const StartCampaign= require('./routes/startcampaign');
const getCampaignStatus= require('./routes/getcampaignstatus');
const AdminLogin= require('./routes/adminlogin');

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
db.admin= require('./modals/Admin')(sequelize, DataTypes);
db.campaign= require('./modals/Campaign')(sequelize, DataTypes);

app.use(express.json());

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.send('Hey there! This is uccda backend.');

    // db.teams.create({ teamid: "TEAM004", teamname: "samTeam", teamlead: "Sam", email: "sam1212@gmail.com", mobile: "8834343434", password: "sam883", teamscore: '0', riddlesnotvisited: "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]" })
    // .then((newUser) => {
    //   console.log('New student created:', newUser.toJSON());
    // })
    // .catch((error) => {
    //   console.error('Error creating student:', error);
    // });

    // db.admin.create({ email: "sharmacj123@gmail.com", password: "admin" })
    // .then((newUser) => {
    //   console.log('New student created:', newUser.toJSON());
    // })
    // .catch((error) => {
    //   console.error('Error creating student:', error);
    // });

    
    // db.riddles.bulkCreate(
    //   [
    //     {
    //      "rid": "RID001",
    //      "description": "In a narrow passage, where courage resides,\nSuperheroes' images stand with pride.",
    //      "riddlecode": "AB",
    //      "location": "Neki ki diwar"
    //     },
    //     {
    //      "rid": "RID002",
    //      "description": "I have two faces. one face doesnot like taller ones and the  other face is hidden from the world . I stay next to noble prize winner",
    //      "riddlecode": "AG",
    //      "location": " mech block back gate "
    //     },
    //     {
    //      "rid": "RID003",
    //      "description": "Calm mind and stable body is what will get you to your next target",
    //      "riddlecode": "AE",
    //      "location": "Archery"
    //     },
    //     {
    //      "rid": "RID004",
    //      "description": "Mere paas aao,  keemti chiz pao,Jyada khwahishe nhi h meri, bs apne keemti ank btao",
    //      "riddlecode": "AX",
    //      "location": "ATM"
    //     },
    //     {
    //      "rid": "RID005",
    //      "description": "I am a gateway to financial dreams,my cords and cards ignite digital streams",
    //      "riddlecode": "AX",
    //      "location": "ATM"
    //     },
    //     {
    //      "rid": "RID006",
    //      "description": " A place where talents brightly shine, With seats in rows, so neatly aligned. Performances echo, emotions soar",
    //      "riddlecode": "BD",
    //      "location": "Auditorium"
    //     },
    //     {
    //      "rid": "RID007",
    //      "description": "Mai batati hun roz ka tapmaan,mujhse hota hai do kinaro ka aadan pradan",
    //      "riddlecode": "BG",
    //      "location": "Bridge"
    //     },
    //     {
    //      "rid": "RID008",
    //      "description": "College ki shaan, yha hota h bhot jaam,Jagah h Kamal , lekin Muft nhi saman",
    //      "riddlecode": "AU",
    //      "location": "Cafeteria"
    //     },
    //     {
    //      "rid": "RID009",
    //      "description": "I'm the tallest brother in the town. Guess who am I ?",
    //      "riddlecode": "AP",
    //      "location": "CV Raman"
    //     },
    //     {
    //      "rid": "RID010",
    //      "description": "I silently wait, serving one and all,No exams, no grades, but a different test",
    //      "riddlecode": "AN",
    //      "location": "Dispensary"
    //     },
    //     {
    //      "rid": "RID011",
    //      "description": "I use network to manage the network of data.Find me.",
    //      "riddlecode": "AJ",
    //      "location": "IT cell "
    //     },
    //     {
    //      "rid": "RID012",
    //      "description": "Where creativity thrives, in the open air,This place in your college, do you know where?",
    //      "riddlecode": "AL",
    //      "location": "LC"
    //     },
    //     {
    //      "rid": "RID013",
    //      "description": " a place Where knowledge grows and stories unfold.",
    //      "riddlecode": "BC",
    //      "location": "Library"
    //     },
    //     {
    //      "rid": "RID014",
    //      "description": " I'm not a wall, but I stand so grand, With open arms, I welcome the land.  I'm the first to greet.",
    //      "riddlecode": "BB",
    //      "location": "Main Gate"
    //     },
    //     {
    //      "rid": "RID015",
    //      "description": " In this block of YMCA , numbers meet strategy and hundreds of aspiring CEOs are born.",
    //      "riddlecode": "AR",
    //      "location": "Management block "
    //     },
    //     {
    //      "rid": "RID016",
    //      "description": "Amidst the pages where wisdom's found,A sacred place where silence is profound.",
    //      "riddlecode": "AM",
    //      "location": "Mandir"
    //     },
    //     {
    //      "rid": "RID017",
    //      "description": "Phoolon ki mehfil, chota sa sthal,Dosto ke liye , kuch yaad gar pal",
    //      "riddlecode": "AY",
    //      "location": "MBA park"
    //     },
    //     {
    //      "rid": "RID018",
    //      "description": "Near the residence where  girls reside, Guess my name, where laughter is amplified.",
    //      "riddlecode": "AY",
    //      "location": "mba park"
    //     },
    //     {
    //      "rid": "RID019",
    //      "description": "I am a fighter built using techniques like welding",
    //      "riddlecode": "BH",
    //      "location": "Mech Next Soldier Statue"
    //     },
    //     {
    //      "rid": "RID020",
    //      "description": "I have keys but no locks,I'm filled with tools and blocks.What am I?",
    //      "riddlecode": "AI",
    //      "location": "Mechanical workshop "
    //     },
    //     {
    //      "rid": "RID021",
    //      "description": "A place with tagline \"Happy Food Happy People\"",
    //      "riddlecode": "AO",
    //      "location": "Mother Dairy"
    //     },
    //     {
    //      "rid": "RID022",
    //      "description": " A place where uniforms stand tall, Leaders emerge, ready to heed the call",
    //      "riddlecode": "BE",
    //      "location": "NCC Office"
    //     },
    //     {
    //      "rid": "RID023",
    //      "description": "In vibrant colors, they bloom with grace,On which place do you see the flowers' embrace?",
    //      "riddlecode": "AV",
    //      "location": "Nursery"
    //     },
    //     {
    //      "rid": "RID024",
    //      "description": "Hai mitti jaha har pal pal,Khade hote hai ghode jahan thak kar chal kar,Baarish mai ban jata hai dal-dal",
    //      "riddlecode": "BF",
    //      "location": "Parking"
    //     },
    //     {
    //      "rid": "RID025",
    //      "description": "I don't have a heart, still I can express other's feelings with you. I don't have legs still I can bring gifts and messages for you. Who am I?",
    //      "riddlecode": "AF",
    //      "location": "Post office"
    //     },
    //     {
    //      "rid": "RID026",
    //      "description": "Yaha hum ek aisi chiz bnate hai jisse dekhke har insaan yahi kehta hai ki papa ek baar dila do bss, swaad aa jayege!",
    //      "riddlecode": "AT",
    //      "location": "Royal Enfield"
    //     },
    //     {
    //      "rid": "RID027",
    //      "description": "Padhna hai toh aana padhega, aake sab kuch dikhana pdega ,agar galat hue documents toh bahar tumko jaana padhega.",
    //      "riddlecode": "AD",
    //      "location": "Shakuntalam"
    //     },
    //     {
    //      "rid": "RID028",
    //      "description": "If u are creative, u adore colors, come here, & experience the vibe",
    //      "riddlecode": "AS",
    //      "location": "Srijan Headquarters"
    //     },
    //     {
    //      "rid": "RID029",
    //      "description": "an illustrator's dome",
    //      "riddlecode": "AS",
    //      "location": "srijan headquarters "
    //     },
    //     {
    //      "rid": "RID030",
    //      "description": "With strings and keys, in a snug small place,Guess this spot where voices find their space.",
    //      "riddlecode": "AZ",
    //      "location": "Tarannum Quarters"
    //     },
    //     {
    //      "rid": "RID031",
    //      "description": "Where futures take flight, job dreams take their chance,in this office of prospects, careers advance.",
    //      "riddlecode": "AK",
    //      "location": "TPO"
    //     },
    //     {
    //      "rid": "RID032",
    //      "description": " I'm a garden but I'm not, because I'm not as that you thought, and situated behind the big big building blocks.",
    //      "riddlecode": "AQ",
    //      "location": "Vertical garden"
    //     },
    //     {
    //      "rid": "RID033",
    //      "description": "badi ball hu mai par sab se halki hu, jaha maro vha chali jati hu ,par agar gir gyi to kisiko har dilati hu",
    //      "riddlecode": "AH",
    //      "location": "Volleyball Ground"
    //     },
    //     {
    //      "rid": "RID034",
    //      "description": " a place with two poles and two teams each passing me to one another",
    //      "riddlecode": "AH",
    //      "location": "volleyball ground "
    //     },
    //     {
    //      "rid": "RID035",
    //      "description": "A sustainable way where nature's gift well retained,Guess this method, where water's wisdom is ingrained.",
    //      "riddlecode": "AW",
    //      "location": "Water Harvesting"
    //     },
    //     {
    //      "rid": "RID036",
    //      "description": "Yeh hai ek sthal,Jaha hai Mahilaon ki har samasya ka hal",
    //      "riddlecode": "AC",
    //      "location": "Women cell"
    //     },
    //     {
    //      "rid": "RID037",
    //      "description": "In this space where women's voices resound, Empowerment and safety, here they are found.",
    //      "riddlecode": "AC",
    //      "location": "women cell"
    //     },
    //     {
    //      "rid": "RID038",
    //      "description": "I can show you where things are but I’m not a tour guide,I have a scale but I don’t weigh things. I can show you what’s in north, south, west and east but I’m not a compass ",
    //      "riddlecode": "SG",
    //      "location": "YMCA ka map"
    //     }
    //    ]
    // )
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
app.use('/handlefreeze', middleDB, HandleFreeze);
app.use('/startcampaign', middleDB, StartCampaign);
app.use('/getcampaignstatus', middleDB, getCampaignStatus);
app.use('/adminlogin', middleDB, AdminLogin);

app.use((req, res) => {
    res.status(404).send('Not found!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
