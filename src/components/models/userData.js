
module.exports = (sequelize, DataTypes) => {

    const userData = sequelize.define("userData", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mobileNo:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey:true
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        flag:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        isAdmin:{
            type: DataTypes.STRING,
            allowNull: false,
        }


    })

    return userData
}