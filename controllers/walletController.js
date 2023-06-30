const NftUsers = require('../model/NftUsers');


const existingWalletUser = async (req, res) => {

    const { walletAddress } = req.body;

    if(!walletAddress ) return res.status(400).json({message : 'wallet address and privatekey required'});

    const user = await NftUsers.findOne({contractAddress : walletAddress}).exec();
    if(!user) return res.status(204).json({message : 'new user detected'});

    const roles = Object.values(user.roles);
    res.status(200).json({ user, roles});

}



const authWallet = async (req, res) => {
    const { walletAddress } = req.body;

    if(!walletAddress ) return res.status(400).json({message : 'wallet address and privatekey required'});

    const user = await NftUsers.findOne({contractAddress : walletAddress}).exec();

    if(!user) {

        if(req.body?.privateKey) {

            const user = await NftUsers.create({ contractAddress : walletAddress, privateKey : req.body?.privateKey });

            if(!user) return res.status(400).json({message : 'wallet integration failed!'});


            user.userName =   ` new user#${Math.random()}`
            const result1 = user.save()

            if(!result1) return res.status(400).json({message : 'wallet integration failed!'});
            

            const roles = Object.values(user.roles);
            res.status(201).json({user, roles})
        }else{

            
            const user = await NftUsers.create({ contractAddress : walletAddress});
            
            if(!user) return res.status(400).json({message : 'wallet integration failed!'});
            
            user.userName =   ` new user#${Math.random()}`
            const result1 = user.save()
            
            if(!result1) return res.status(400).json({message : 'wallet integration failed!'});
            
            const roles = Object.values(user.roles);
            res.status(201).json({user, roles})
        }


    }
    
}



module.exports = {
    authWallet,
    existingWalletUser
}