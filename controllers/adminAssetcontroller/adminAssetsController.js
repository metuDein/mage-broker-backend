const Assets = require('../../model/Assets');
const NftUsers = require('../../model/NftUsers');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

const AdminCreateAsset = async(req, res) => {
    const { assetImage, assetName, assignTo, assetPrice, assetQuantity, assetNetwork, assetCategory , description} = req.body;

    if(!assetImage || !assetName || !assignTo || !assetPrice || !assetQuantity || !assetNetwork || !assetCategory) return res.status(400).json({message : 'all fields required'});


    const owner = await NftUsers.findOne({ userName : assignTo }).exec();

    if(!owner) return res.status(400).json({message : 'user not found'});
    
    const duplicate = await Assets.findOne({ OwnerName : assignTo, image :assetImage}).exec();

    if(duplicate) return res.status(409).json({message : 'duplicate asset found'});
    let uploadImage;

        await cloudinary.uploader.upload(assetImage,
        { public_id: "nftartadmincreate" }, 
        function(error, result) { 
            console.log(result.secure_url);
            return uploadImage = result.secure_url;
        });
    
        if(!uploadImage) return res.status(400).json({message : 'image upload failed'});



    const newAsset = await Assets.create({ name : assetName, image : uploadImage, OwnerName : owner.userName, price : assetPrice, block_number_minted : assetQuantity, blockChain :assetNetwork, description : description, categories : assetCategory });

    


    if(!newAsset)  return res.status(400).json({message : 'asset creation failed'});

    res.status(200).json({message : 'asset created', newAsset});
}

const adminEditAsset = async(req, res) =>{
    const { id } = req.body;

    if (!id)  return res.status(400).json({message : 'id required'});

    const asset = await Assets.findOne({ _id : id }).exec();

    if (!asset)  return res.status(204).json({message : 'asset no found'});

    if(req?.body?.description) asset.description = req.body.description;
    if(req?.body?.price) asset.price = req.body.price;
    if(req?.body?.supply) asset.block_number_minted = req.body.supply;
    if(req?.body?.category) asset.categories = req.body.category;
    if(req?.body?.trending) asset.trending = req.body.trending;
    if(req?.body?.OwnerName) asset.OwnerName = req.body.OwnerName;
    if(req?.body?.image ){

        

        let uploadImage;

        await  cloudinary.uploader.upload(req.body?.image,
            { public_id: "nftarteditadmin" }, 
            function(error, result) { 
                console.log(result.secure_url);
                return uploadImage = result.secure_url 
            });

        asset.image = uploadImage
    
    }


 
    const result = await asset.save();

    if(!result)  return res.status(400).json({message : 'asset update failed'});

    res.status(200).json({message : 'asset updated', result});
    
}



module.exports = {
    AdminCreateAsset,
    adminEditAsset
}