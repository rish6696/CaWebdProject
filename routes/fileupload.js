const express=require('express');
const router=express.Router();
const multer=require('multer');
const {
    Uploads
}=require('../db');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage })


router.post('/', upload.single('avatar'), async  (req, res, next)=> {
    
    const upload=await Uploads.create({
        filename:req.file.originalname,
        caId:req.body.caid,
        clientId:req.body.clientid
    })
    res.redirect('/')
  })



module.exports=router;