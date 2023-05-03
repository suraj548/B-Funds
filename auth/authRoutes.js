const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const validate = require("./auth");
const donors = require('../models/records');



router.post("/login",
    async (req,res)=>{
        var uname = req.body.username
        var password = req.body.password
       
       
        var result = await user.findOne({username: uname})
        if(result===null)
        {
            res.status(404).send("User doesnot exists")
        }
        else{
            
            if(result.password === password)
            {
                const token = jwt.sign({_id: result._id}, "IAmSecret")
                res.status(200).send(token)
            }
            else{
                res.status(401).send("Wrong password or username")
            }
          
        }
    })


router.post("/donor-entry", validate,
    async (req,res)=>{

        var name = req.body.name
        var address = req.body.address
        var amount = req.body.amount

        var newrecord = new donors({name:name,address:address,amount:amount})

        newrecord.save().then(()=>{

            res.status(200).send("Record Inserted")
        
        }).catch((error)=>{
        
            res.status(404).send("error")
        
        })

    })

router.delete("/donor-delete/:id", validate,
    async (req,res)=>{

        var id = req.params.id
        var result = donors.deleteOne({_id:id}).then(()=>{
        
            res.status(202).send("Record Deleted")
        
        }).catch((error)=>{
        
            res.status(404).send("Error deleting, Please try again later")
        
        })
    })



module.exports=router;