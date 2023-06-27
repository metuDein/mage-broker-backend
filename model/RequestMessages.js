const { default : mongoose} = require('mongoose');
const Schema = mongoose.Schema;



const requestMessage = new Schema({
    title : {
        type : String
    },
    send_from : {
        type : String,
        required : true
    },
    reciever : {
        type : String
    },
    body : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now()
    },
    image : {
        type : String
    },
    sender_address : {
        type : String
    },
    read : {
        type :Boolean,
        default : false
    },
    asset : {
        type :String
    } 
}) 

module.exports = mongoose.model('RequestMessage', requestMessage);