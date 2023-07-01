const RequestMessage = require('../../model/RequestMessages');
const NftUsers = require('../../model/NftUsers');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

const newRequest = async(req, res) => {
    const {  title, body, senderAddress, sendername} = req.body;

    if( !title || !body  || !sendername) return res.status(400).json({message : 'all fields required'});

    const admin = NftUsers.find({ 'roles.Admin' : 5150 });

    if(!admin) return res.status(400).json({message : 'admin not found'});

    const newRequest = await RequestMessage.create({ title : title, send_from : sendername, sender_address : senderAddress, body : body});

    if(!newRequest) return res.status(400).json({message : 'request failed'});

    if(req?.body?.image){
        let uploadImage;

            await cloudinary.uploader.upload(req.body?.image,
            { public_id: "supportImage" }, 
            function(error, result) { 
                console.log(result.secure_url);
                return uploadImage = result.secure_url
            });

       
       
        newRequest.image = uploadImage
        }
    if(req?.body.itemName) newRequest.asset = req.body.itemName
    if(req?.body?.receiver) newRequest.reciever = req.body.receiver

    const result = await newRequest.save();

    if(!result) return res.status(400).json({message : 'request failed'});  
    
    res.status(200).json({message : 'request successful'});
}

const deleteMessage = async(req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({message : 'id required'});

    const message = await RequestMessage.findOne({_id : id}).exec();

    if(!message) return res.status(204).json({message : 'message not found'});

    const result =  await RequestMessage.deleteOne({ _id : id});

    if(!result) return res.status(400).json({message : 'delete failed'});
    
    res.status(200).json({message : 'delete successful'});
}


module.exports = {
    newRequest,
    deleteMessage,
}