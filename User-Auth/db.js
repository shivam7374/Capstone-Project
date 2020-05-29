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
const Products=db.define('product',{
    id:{
        type:sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:sequelize.DataTypes.STRING(30),
        allowNull:false
    },
    name:{
        type:sequelize.DataTypes.STRING(100),
        allowNull:false
    },
    price:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    },
    company:{
        type:sequelize.DataTypes.STRING,
        allowNull:true
    }
})
module.exports={
    db,Users,Products
}