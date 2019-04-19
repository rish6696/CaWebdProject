const express=require('express');
const router=express.Router();

router.use('/mobile',(req,res)=>{
    res.send(req.user);
})

router.use('/',(req,res)=>{
    console.log(req.user);
    if(!req.user)
    {
        return res.render('homepage');
    }
    else{
        if(req.user.isclient)
        {
           return res.render('clientpage',{
               user:req.user
           });
        }
        return res.render('capage',{
            user:req.user
        })
    }
})


module.exports=router;