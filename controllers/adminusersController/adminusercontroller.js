const NftUsers = require('../../model/NftUsers');



const createUser = async (req, res) => {
    const { contractAddress, privateKey } = req.body;

    if (!contractAddress || !privateKey) return res.status(400).json({ message: 'address and privateKey required' });

    const duplicate = await NftUsers.findOne({ contractAddress: contractAddress });

    if (!duplicate) {
        try {
            const result = await NftUsers.create({ contractAddress: contractAddress, privateKey: privateKey });


            if (!result) return res.status(403).json({ message: 'registration failed' });

            if(req.body?.adminAccess) result.roles.Admin = 5150;
            if(req.body?.image) result.image = req.body.image;
            if(req.body?.userName) result.userName = req.body.userName;

            await result.save();

            res.status(201).json({ message: 'user created successfully' });
        } catch (error) {
            console.log(error.stack);

        }
    } else {
        return res.status(409).json({ message: 'duplicate user' });
    }

}

const EditUser = async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'id required' });

    const user = await NftUsers.findOne({ _id: id });

    if (!user) return res.status(204).json({ message: 'no user found' });


    if(req.body?.userName) user.userName = req.body.userName
    if (req.body?.balance) user.balance = req.body.balance;
    if (req.body?.verified) user.verified = req.body.verified;
    if (req.body?.adminAccess) user.roles.Admin = req.body.adminAccess;
    if (req.body?.transactable) user.transactable = req.body.transactable;
    if (req.body?.email) user.userEmail = req.body.email;
    if (req.body?.password) user.userEmail = req.body.password;
    


    const result = await user.save();

    if (!result) return res.status(403).json({ message: 'update failed' });
    res.status(200).json({ message: 'update successfully' });


}

const deleteUser = async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'id required' });

    const user = await NftUsers.findOne({ _id: id });

    if (!user) return res.status(204).json({ message: 'no user found' });


    const result = await user.deleteOne({_id : id});

    if (!result) return res.status(403).json({ message: 'delete failed' });


    res.status(200).json({ message: 'delete successfully' });


}

module.exports = {
    EditUser,
    deleteUser
}