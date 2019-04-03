const express=require('express');
const router=express.Router();
const passport=require('passport')

router.use('/',(req,res)=>{
    if(!req.user)
    {
        res.redirect('/login');
    }
    if(req.user.isclient)
    {
        return res.redirect('/client_profile.html')
    }
    return res.redirect('/ca_profile.html')

})

module.exports=router