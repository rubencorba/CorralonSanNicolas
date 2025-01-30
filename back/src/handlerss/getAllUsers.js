const {Users}= require('../db.js');

const getAllUsers =async()=> await Users.findAll()


module.exports={getAllUsers}