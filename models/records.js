const mongoose = require('mongoose');


const donationSchema = new mongoose.Schema({
    name: {type: String, required:true},
    address: {type: String},
    amount: {type: Number, required:true}
})



module.exports = mongoose.model("donation", donationSchema, "donation");