require('dotenv').config();
const express= require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path')
const connectDb = require('./config/dbConn');
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const bodyParser = require('body-parser');



connectDb();

app.use(logger)



app.use(cors(corsOptions))

app.use(credentials)


app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')))






// front end controllers
app.use('/trending', require('./routes/frontend/trending'));
app.use('/homepagedata', require('./routes/frontend/homepageData'));
app.use('/getallassets', require('./routes/frontend/getAllAssets'));
app.use('/getallcartitems', require('./routes/frontend/getAllcartItems'));
app.use('/getallusers', require('./routes/frontend/getAllUsers'));
app.use('/getallmessages', require('./routes/frontend/getAllMessages'));
app.use('/getallmessages', require('./routes/frontend/getAllMessages'));
app.use('/', require('./routes/root'));





// userAuth
app.use('/userregister', require('./routes/userauth/userRegistration'));
app.use('/userlogin', require('./routes/userauth/userLogin'));
app.use('/useraddmore', require('./routes/userauth/userAddMore'));
app.use('/userwalletauth', require('./routes/userauth/userWalletAuth'));
app.use('/checkwalletauth', require('./routes/userauth/userWalletExist'));



// api lockdown
app.use('/userassets', require('./routes/api/userApi/userAssets'));
app.use('/cashier', require('./routes/api/userApi/cashier'));

app.use('/userdeleteasset', require('./routes/api/userApi/userassetdelete'));
app.use('/useraccount', require('./routes/api/userApi/useraccount'));
app.use('/supportrequest', require('./routes/api/userApi/usersupportrequest'));
app.use('/deletemessage', require('./routes/api/userApi/userDeleteMessage'));


// admin api
app.use('/adminassets', require('./routes/api/adminApi/adminAssetControl'));
app.use('/admindeleteassets', require('./routes/api/adminApi/adminAssetDelete'));
app.use('/adminusers', require('./routes/api/adminApi/adminUserControl'));
app.use('/admindeleteusers', require('./routes/api/adminApi/adminUserDelete'));


// user cart controller
app.use('/addtocart', require('./routes/api/userApi/usercart'));
app.use('/purchase', require('./routes/api/userApi/purchase'));
app.use('/deletefromcart', require('./routes/api/userApi/userdeletecart'));


// test route
app.use('/imageupload', require('./routes/imageUpload'));


app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message : '404 n0t found'});
    }else{
        res.type('txt').send('404 not found');
    }
})


app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log('mongoDb connected')
    app.listen(PORT, ()=> console.log(`app running on port ${PORT}`))
}, )



