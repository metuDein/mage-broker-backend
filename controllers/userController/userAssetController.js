const Assets = require('../../model/Assets');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });


  const opts = {
    overwrite : true,
    invalidate : true,
    resource_type :"auto"
  }


const createNewAsset = async (req, res) => {
    const { image, name, price, desc, supply, blockchain, category, ownername } = req.body;

    if(!image || !name || !price || !desc || !supply || !blockchain || !category || !ownername) return res.status(400).json({message : 'all field required'});

    const duplicateAsset = await Assets.findOne({ image : image }).exec();
    
    if(!duplicateAsset){
    let uploadImage;

        await cloudinary.uploader.upload(image,
            { public_id: "nftartusercreate" }, 
            function(error, result) { 
                console.log(result.secure_url);
                return uploadImage = result.secure_url
            });
        
            if(!uploadImage) return res.status(400).json({message : 'image upload failed'});

        const result = await Assets.create({image : uploadImage, name : name, price : price, description : desc, block_number_minted : supply, blockChain : blockchain, categories : category, OwnerName : ownername });

        if(!result) return res.status(400).json({message : 'item creation failed'});

        res.status(201).json({message : 'item creation successful', result});

    }
    return res.status(409).json({message : 'duplicate item created'});

}

const editAsset = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({message : 'id required'});
    
    const asset = await Assets.findOne({_id : id}).exec();

    if (!asset) return res.status(204).json({message : 'no asset found'});

    if (req.body?.image && req.body.image !== asset.image) {
        let uploadImage;

        await cloudinary.uploader.upload(req.body?.image,
            { public_id: "nftartuseredit" }, 
            function(error, result) { 
                console.log(result.secure_url);
                return uploadImage = result.secure_url
            });
           
        
        asset.image = uploadImage     
    }
    if (req.body?.name) asset.name = req.body.name
    if (req.body?.price) asset.price = req.body.price
    if (req.body?.desc) asset.description = req.body.desc
    if (req.body?.supply) asset.block_number_minted = req.body.supply
    if (req.body?.blockchain) asset.blockChain = req.body.blockchain
    if (req.body?.category) asset.categories = req.body.category

    const result = await asset.save();

    if(!result) return res.status(400).json({message : 'update failed'});
    
    res.status(200).json({message : 'update successful', result});

}

const deleteAsset = async(req, res) => {
    const { id } = req.body
   

    if(!id) return res.status(400).json({message : 'id required'});
    
    const asset = await Assets.findOne({_id : id}).exec();

    if (!asset) return res.status(204).json({message : 'no asset found'});

    const result = await asset.deleteOne({ _id : id});

    if(!result) return res.status(400).json({message : 'delete failed'});
    
    res.status(200).json({message : 'delete successful'});


}

module.exports = {
    createNewAsset,
    editAsset,
    deleteAsset
};