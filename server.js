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
    homepage:require('./routes/homepage'),
    requests:require('./routes/requests'),
    fileuploads:require('./routes/fileupload')
}

app.use('/login',routes.login);
app.use('/signup',routes.signup);
app.use('/public',express.static(__dirname+'/public'));
app.use('/requests',routes.requests);
app.use('/addfile',routes.fileuploads);
app.use('/',routes.homepage);



app.listen('4578',()=>{
    db.sync().then(()=>{

        console.log('server started and database synced');
    })
   
})
