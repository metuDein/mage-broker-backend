const Cashier = require('../../model/Cashier');


const createCashier = async (req, res) => {
    const { username, type, amount } = req.body;

    if(!username || !type || !amount) return res.status(400).json({message : 'all fields required'});

    const cashTransact = await Cashier.create({ madeBy : username, cashierType : type, amount : amount, status : 'pending',  })

    if(!cashTransact) return res.status(400).json({message : 'all fields required'});

    res.status(200).json({ cashTransact })

};



module.exports =  {
    createCashier
}