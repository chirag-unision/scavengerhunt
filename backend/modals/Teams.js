module.exports= (sequelize, DataTypes)=> {
    const Teams= sequelize.define('teams', {
        teamid: DataTypes.STRING,
        teamname: DataTypes.STRING,
        teamlead: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.BIGINT,
        password: DataTypes.STRING,
        teamscore: DataTypes.STRING,
        riddlesnotvisited: DataTypes.STRING,
        finishtime: DataTypes.DATE
    });
    return Teams;
}