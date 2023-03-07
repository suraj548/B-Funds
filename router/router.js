const express = require('express');
const router = express.Router();
const users = require('../models/user');
const donors = require('../models/records');
const records = require('../models/records');

router.post("/login",
    async (req,res)=>{
        var uname = req.body.username
        var password = req.body.password
       
       
        var result = await users.findOne({username: uname})
        //console.log(result)

        if(result===null)
        {
            res.send(false)
        }
        else{
            
            var sucess = result.password === password
            res.send(sucess)
          
        }
    })

router.get("/donors",
    async (req,res)=>{
        var result = donors.find().then((all)=>{

            res.json(all)
        
        }).catch((error)=>{
        
            res.json({message:"Error"})
        
        })
    }
)

router.post("/donor-entry",
    async (req,res)=>{

        var name = req.body.name
        var address = req.body.address
        var amount = req.body.amount

        var newrecord = new records({name:name,address:address,amount:amount})

        newrecord.save().then(()=>{

            res.send("Record Inserted")
        
        }).catch((error)=>{
        
            res.send("error")
        
        })

    })



router.delete("/donor-delete/:id",
    async (req,res)=>{

        var id = req.params.id
        
        var result = donors.deleteOne({_id:id}).then(()=>{
        
            res.send(true)
        
        }).catch((error)=>{
        
            res.send(error)
        
        })
    })

module.exports = router;
