const NftUsers = require('../model/NftUsers');

const handleLogin = async (req, res) => {
   const {username, password} = req.body;

   if(!username || !password) return res.status(400).json({message : 'all fields required'});
   
   const user = await NftUsers.findOne({ userName : username, password: password }).exec(); 

   if(!user) return res.status(401).json({message : 'invaild details or you are not registered'});
   const roles = Object.values(user.roles);

   res.status(200).json({user, roles});

}

const handleRegister = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) return res.status(400).json({message : 'all fields required'});

    const duplicate = await NftUsers.findOne({ userName : username, userEmail : email}).exec();

    if(!duplicate) {
        const user = await NftUsers.create({ userName : username, userEmail : email, password : password });

        if(!user)  return res.status(403).json({message : 'registration failed'});

        const roles = Object.values(user.roles);

        res.status(201).json({user, roles});

    }else{
        return res.status(409).json({message : 'duplicate user found'});
    }
}

    const handleAddMore = async (req, res) => {
        const {id}  = req.body;
        if (!id)  return res.status(400).json({message : 'id required'});

        const user = await NftUsers.findOne({ _id : id }).exec();
        if(!user)  return res.status(401).json({message : 'no user found'});

        if(req?.body?.image){
            let uploadImage;

        await  cloudinary.uploader.upload(req.body?.image,
            { public_id: "nftarteditadmin" }, 
            function(error, result) { 
                console.log(result.secure_url);
                return uploadImage = result.secure_url 
            });

        user.image = uploadImage;
        }
        if(req?.body?.email) user.userEmail = req.body.email;
        if(req?.body?.username) user.userName = req.body.username;

        const result = await user.save();

        if(!result) return res.status(400).json({message : 'update failed'});

        res.status(200).json({message : 'update success', result});
    }

module.exports =  {
    handleRegister,
    handleLogin,
    handleAddMore
}