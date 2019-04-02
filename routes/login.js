const express=require('express');
const router=express.Router();
const passport=require('passport')

router.get('/ca',(req,res)=>{
    res.render('loginca')

})
router.get('/client',(req,res)=>{
    res.render('loginclient')

})
router.post('/client',passport.authenticate('local',{
    successRedirect:'/pm',
    failureRedirect:'/kk'

}))







module.exports=router