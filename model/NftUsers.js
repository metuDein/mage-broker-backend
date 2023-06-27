const { default : mongoose} = require('mongoose');
const Schema = mongoose.Schema;


const nftUsers = new Schema({
    userName: {
        type: String,
    },
    userEmail : {
        type : String,
        default : ''
    },
    contractAddress: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    },
    password : {
        type : String,
    },
    purchases : {
        purchaseItem : {
            id : String
        }
    },
    favorites: {
        item: {
            itemId: String,
            itemName: String,

        }

    },
    
    logged : {
        type : Boolean,
        default : false
    },

    verified: {
        type: Boolean,
        default: false
    },
    transactable: {
        type: Boolean,
        default: false
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    privateKey: {
        type: String,
    },

    cart: {
        item: {
            Quantity: Number,
            paid: {
                type: Boolean,
                default: false
            },
            itemId: String
        }

    },
    image : {
        type : String,
        default : ''
    },
    refreshToken: String,
});


module.exports = mongoose.model('Users', nftUsers);
