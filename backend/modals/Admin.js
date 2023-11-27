module.exports= (sequelize, DataTypes)=> {
    const Admin= sequelize.define('admins', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Admin;
}