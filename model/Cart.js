const { default : mongoose} = require('mongoose');

const Schema = mongoose.Schema;


const cart = new Schema({
    cartOwner : {
        type : String
    },
    cartOwnerName : {
        type : String,
    },
    
    itemId : String,
    itemName : {
        type : String,
        default : 'cartItem' 
    },
    itemImage : String,
    price : Number, 
    quantity : Number, 
    completed : {
        type : Number,
        default : 0
    },
    paid  :{
        type : Boolean,
        default : false
    },

    date : {
        type : Date,
        defualt : Date.now()
    }
        
})

module.exports = mongoose.model('Cart', cart);