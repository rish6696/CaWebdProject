const express=require('express');
const router=express.Router();

const{
    Clients,CAs,Users
}=require('../db');

router.get('/',(req,res)=>{
    res.render('signup')

})
router.post('/',async (req,res)=>{
    try{
    
    if(req.body.caorclient==='')
    {
        return res.status(400).send("please specify the type of client");
    }
    const user= await Users.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password,
        phone:req.body.phone,
        isclient:req.body.caorclient==='User'? true:false

     })
    if(req.body.caorclient==='User')
    {
        const client= await Clients.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone

         })
         res.redirect('/login');
    }
    else{
        const ca= await CAs.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone

         })
         res.redirect('/login');
        
    }
}
catch{
    res.send("error")
}

    

})

module.exports=router