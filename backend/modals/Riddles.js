module.exports= (sequelize, DataTypes)=> {
    const Riddles= sequelize.define('riddles', {
        rid: DataTypes.STRING,
        description: DataTypes.STRING,
        riddlecode: DataTypes.STRING
    });
    return Riddles;
}