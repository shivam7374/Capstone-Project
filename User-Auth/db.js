const sequelize=require('sequelize')

const db=new sequelize({
    dialect:'sqlite',
    storage:__dirname+'/users.db'
})

const Users=db.define('user',{
    id:{
        type:sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:sequelize.DataTypes.STRING(30),
        unique:true,
        allowNull:false
    },
    email:{
        type:sequelize.DataTypes.STRING(100)
    },
    password:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    }
})
module.exports={
    db,Users
}