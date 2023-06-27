const Assets = require('../model/Assets');
const Cart = require('../model/Cart');
const Cashier = require('../model/Cashier');
const NftUsers = require('../model/NftUsers');
const RequestMessages = require('../model/RequestMessages');



const getAlltrendingAssets = async (req, res) => {
    const trendingAssets = await Assets.find({ trending : true });
    if(!trendingAssets) return res.status(204).json({ message : 'no data found' });
    
    res.status(200).json({trendingAssets})
}


const getHompageData = async (req, res) => {
    const assets = await Assets.find().limit(48);
    if(!assets) return res.status(204).json({ message : 'no data found' });

    res.status(200).json({assets});
}

const getAllAssets  =  async (req, res) => {
    const assets = await Assets.find();
    if(!assets) return res.status(204).json({ message : 'no data found' });

    res.status(200).json({assets});
}

const getAllCartItems = async(req, res) => {
    const cartItems = await Cart.find();
    if(!cartItems) return res.status(204).json({ message : 'no data found' });

    res.status(200).json({cartItems});
}

const getAllMessage = async(req, res) => {
  const messages = await RequestMessages.find();

  if(!messages) return res.status(204).json({ message : 'no data found' });

    res.status(200).json({messages});
  
}
const getAllCashier = async(req, res) => {
  const cashier = await Cashier.find();

  if(!cashier) return res.status(204).json({ message : 'no data found' });

    res.status(200).json({cashier});
  
}

const getAllUsers = async(req, res) => {
    const users = await NftUsers.find();
    if(!users) return res.status(204).json({ message : 'no data found' });

    res.status(200).json({users});
}

const getAsset = async(req, res) => {
    const { id } = req.params;

    if(!id)  return  res.status(200).json({message : 'no id found'});

    const asset = await Assets.findOne({ _id : id}).exec();

    if(!asset) return res.status(200).json({message : 'no id found'});

    res.status(200).json({asset});
}

module.exports = {
    getAlltrendingAssets,
    getHompageData,
    getAllAssets,
    getAllCartItems,
    getAllMessage,
    getAllCashier,
    getAllUsers,
    getAsset
}