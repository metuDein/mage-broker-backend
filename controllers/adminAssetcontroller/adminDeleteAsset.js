const Assets = require('../../model/Assets');


const deleteAsset = async(req, res) => {
    const {id } = req.body;

    if(!id) return res.status(400).json({message : 'id required'})

    const  asset = await Assets.findOne({ _id : id}).exec();

    if(!asset) return res.status(204).json({message : 'no asset found'});

    const result = await asset.deleteOne({ _id : id});
    if(!result )  return res.status(400).json({message : 'asset delete found'});

    res.status(200).json({ message : 'asset deleted'})
}


module.exports = {
    deleteAsset
}