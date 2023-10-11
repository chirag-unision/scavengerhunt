module.exports= (sequelize, DataTypes)=> {
    const Teams= sequelize.define('teams', {
        teamid: DataTypes.STRING,
        teamname: DataTypes.STRING,
        teamlead: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.BIGINT,
        password: DataTypes.STRING,
        teamscore: {
            type: DataTypes.STRING,
            defaultValue: "0"
        },
        freezeTime: {
            type: DataTypes.STRING,
            defaultValue: "0"
        },
        riddlesnotvisited: {
            type: DataTypes.STRING,
            defaultValue: "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]"
        },
        finishtime: DataTypes.DATE
    });
    return Teams;
}