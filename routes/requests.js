const express=require('express');
const router=express.Router();
const{
    CAs,Ca_Client,Codes,Clients
}=require('../db');
const main=require('./mail');

router.get('/getca',async (req,res)=>{

    const cas= await CAs.findAll();
    res.send(cas);

})
router.post('/getclientfromuserid', async (req,res)=>{
    
    const client =await Clients.findOne({
        where:{
            username:req.body.username
        }
    })
    res.send(client)


})

router.post('/sendmail',(req,res)=>{
    console.log(req.body);
    const email=req.body.email;
    const text=req.body.text
    main(email,text).then(()=>{
        res.send({
            sucsess:true
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            sucsess:false
        })
    })

})
router.post('/addcode', async (req,res)=>{
    try{
    const code=req.body.code;
    const c_id=req.body.c_id;
    const causername=req.body.causername;
    const ca=await CAs.findOne({
        where:{
            username:causername
        }
    })
    console.log(ca);
    const ca_client=await Codes.create({
        unicode:code,
        clientid:c_id,
        caid:ca.id
     })
     res.send(ca_client)
    }
    catch{
        res.send({
            sucess:false
        })
    }


})
router.use('/addclient', async (req,res)=>{
    const code= await Codes.findOne({
        where:{
            unicode:req.query.unicode
        }
    })
    Codes.destroy({
        where:{
            unicode:req.query.unicode
        }
    })
    const ca_client= await Ca_Client.create({
        clientId:code.clientid,
        caId:code.caid
    })
    res.send("this user has been added");
    
})


module.exports=router;