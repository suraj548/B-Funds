const express = require('express');
const router = express.Router();
const donors = require('../models/records');

router.get("/donors",
    async (req,res)=>{
        donors.find().then((all)=>{

            res.status(200).json(all)
        
        }).catch((error)=>{
        
            res.status(404).send("Error")
        
        })
    }
)

module.exports = router;
