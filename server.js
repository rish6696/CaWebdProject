const express=require('express');
const app=express();
const session=require('express-session');
const passport=require('./pass_clients');

app.use(express.urlencoded({extended:true}));
app.use(express.json());






app.set('view engine','hbs');
const{
    db
}=require('./db');
app.use(session({
    secret: '788456',
    resave: false,
    saveUninitialized: true
}))




app.use(passport.initialize())

app.use(passport.session())



const routes={

    login:require('./routes/login'),
    signup:require('./routes/signup'),
    profile:require('./routes/profile'),
    homepage:require('./routes/homepage')
}

app.use('/login',routes.login);
app.use('/signup',routes.signup);
app.use('/profile',routes.profile);
app.use('/',routes.homepage);


app.listen('4578',()=>{
    db.sync().then(()=>{

        console.log('server started and database synced');
    })
   
})
