module.exports= (sequelize, DataTypes)=> {
    const Campaign= sequelize.define('campaigns', {
        admin_id: DataTypes.INTEGER,
        status: DataTypes.STRING
    });
    return Campaign;
}