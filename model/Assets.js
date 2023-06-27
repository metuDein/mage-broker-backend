const { default : mongoose} = require('mongoose');

const Schema = mongoose.Schema;




const assets = new Schema({
    token_address: {
        type: String,
        
    },
    token_id: {
        type: String, 
    },
    block_number_minted: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default : 0.5
    },
    name: {
        type: String,
        required: true,
    },
    token_uri: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    blockChain : String,
    categories : {
        type  : String,
        default : 'NFTs'
    },
    trending : {
        type : Boolean,
        default : false
    },
    network :{
        type :String,
        default : 'Ethereum'
    },

    description  : {
        type : String,
        default :""
    },
    OwnerName : {
        type : String,
       
    }

},
{
    timestamps : true
}
)


module.exports = mongoose.model('Assets', assets);
