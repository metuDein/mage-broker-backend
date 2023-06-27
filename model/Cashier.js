const { default : mongoose} = require('mongoose');

const Schema = mongoose.Schema;


const Cashier = new Schema({
    madeBy : {
        type : String,
        required : true
    },
    cashierType : {
        type  : String,
        required :true
    },
    amount : {
        type : Number,
    },
    status : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now()    
    }


});


module.exports = mongoose.model('Cashier', Cashier);