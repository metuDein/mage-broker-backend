const Cart = require('../../model/Cart');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });


const addToCart = async(req, res) => {
    const { ownerName, itemPrice, itemId, itemImage, quantity, itemName  } = req.body;

    if(!ownerName || !itemPrice || !itemId || !itemImage || !quantity || !itemName) return res.status(400).json({message : 'all field required'});


    // const duplicate = await Cart.findOne({  itemImage : itemImage, cartOwnerName : ownerName }).exec();

    const ownerCartItems = Cart.find({ cartOwnerName : ownerName });

    const duplicate = ownerCartItems.findOne({ itemImage : itemImage }).exec();



    if(!duplicate){
        let uploadImage;

        await cloudinary.uploader.upload(itemImage,
            { public_id: "nftartusercart" }, 
            function(error, result) { 
                console.log(result.secure_url);
                return uploadImage = result.secure_url
            });

        const result = await Cart.create({ cartOwnerName : ownerName, price : itemPrice, itemId  : itemId, quantity : quantity, itemName : itemName, itemImage : uploadImage });

        if(!result) return res.status(400).json({message : 'failed to add item'});

        if(req?.body?.ownerAddress) result.cartOwner = req.body.ownerAddress;

        const result0 = await result.save();

        if(!result0) return res.status(400).json({message : 'failed to add item'});

        res.status(200).json({message : 'item added to cart', result0});

    }else{

        
        duplicate.quantity = duplicate.quantity + quantity;
        
        duplicate.price = duplicate.price * duplicate.quantity;
        
        const result0 = await duplicate.save();

        if(!result0) return res.status(400).json({message : 'failed to add item'});
        
        res.status(200).json({message : 'item added to cart', result0 });
    }


}

const deleteCartItem = async(req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({message : 'id required'});

    const cartItem =  await Cart.findOne({_id : id}).exec()

    if (!cartItem) return res.status(204).json({message : 'no item found'});

    const result = await cartItem.deleteOne({_id : id});
    
    if(!result) return res.status(400).json({message : 'delete failed'});

     res.status(200).json({message : 'item removed'});
}

module.exports = {
    addToCart,
    deleteCartItem
} 