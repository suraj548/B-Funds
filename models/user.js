const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required:true}
})
 
// userSchema.pre('save',async function(next){
//     try{
//         const salt=await bcrypt.genSalt(10)
//         const hashP = await bcrypt.hash(this.password,salt)
//         this.password=hashP
//         next()
//     }
//     catch(error){
//         next(error)
//     }
// })

// userSchema.methods.isValid=async function(password){
//     const users = this;
//     const compare = await bcrypt.compare(password,users.password);
//     return compare;
// }

module.exports = mongoose.model("user", userSchema, "user");