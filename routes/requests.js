const express=require('express');
const router=express.Router();
const{
    CAs
}=require('../db');

router.get('/getca',async (req,res)=>{

    const cas= await CAs.findAll();
    res.send(cas);

})


module.exports=router;