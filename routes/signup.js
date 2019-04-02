const express=require('express');
const router=express.Router();

const{
    Clients,CAs
}=require('../db');

router.get('/',(req,res)=>{
    res.render('signup')

})
router.post('/',async (req,res)=>{
    
    if(req.body.caorclient==='')
    {
        return res.status(400).send("please specify the type of client");
    }
    if(req.body.caorclient==='User')
    {
        const client= await Clients.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone

         })
         res.redirect('/login/client');
    }
    else{
        const ca= await CAs.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone

         })
         res.redirect('/login/ca');
        
    }
    

})
module.exports=router