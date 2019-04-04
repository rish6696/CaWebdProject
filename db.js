const Sequelize=require('sequelize');
const db=new Sequelize({
    dialect:'mysql',
    host:'localhost',
    username:'user_manager',
    password:'user_manager',
    database:'caprojectdb'
})
const Codes=db.define('codes',{
    unicode:{
        type:Sequelize.STRING(50),
        allowNull:false,
    
    },
    caid:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    clientid:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})
const Users=db.define('users',{
    firstname:{
        type:Sequelize.STRING(50),
        allowNull:false,
        
    },
    lastname:{
        type:Sequelize.STRING(50),
    },
    username:{
        type:Sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING(20),
        allowNull:false

    },
    phone:{
        type:Sequelize.STRING
    },
    isclient:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})


const Clients=db.define('clients',{
    firstname:{
        type:Sequelize.STRING(50),
        allowNull:false,
        
    },
    lastname:{
        type:Sequelize.STRING(50),
    },
    username:{
        type:Sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING(20),
        allowNull:false

    },
    phone:{
        type:Sequelize.STRING
    }
})
const CAs=db.define('cas',{
    firstname:{
        type:Sequelize.STRING(50),
        allowNull:false
        
    },
    lastname:{
        type:Sequelize.STRING(50)
    },
    username:{
        type:Sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING(20),
        allowNull:false

    },
    phone:{
        type:Sequelize.STRING
    }
})
const Ca_Client=db.define('ca_client');

Clients.hasMany(Ca_Client);
Ca_Client.belongsTo(Clients);

CAs.hasMany(Ca_Client);
Ca_Client.belongsTo(CAs);

module.exports={
    db,Clients,CAs,Ca_Client,Users,Codes
}