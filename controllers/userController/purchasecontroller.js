const Cart = require('../../model/Cart');


const completePurchase = async(req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({message : 'id required'});

    const cartItem = await Cart.findOne({_id : id}).exec();

    if(!cartItem) return res.status(204).json({message : 'no item found'});

    cartItem.paid = true

    const result =  await cartItem.save();
    
    if(!result) return res.status(204).json({message : 'purchase failed'});

    res.status(200).json({message : 'purchase sucessful'});

}

module.exports = {
    completePurchase
}