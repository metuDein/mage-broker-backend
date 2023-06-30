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



  const imageUpload = async(req, res) => {

    let uploadImage
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(req.body?.image, opts, (error, result) => {
            if(result && result.secure_url){
                console.log(result.secure_url);
                uploadImage = result.secure_url;
                res.status(200).json({message : 'upload success'});
                return resolve(result.secure_url)
            }
            console.log(error.message);
            return reject({message : error.message})
        });
    });
  };

// const imageUpload = async(req, res) => {

//     cloudinary.uploader.upload(req.body?.image,
//     { public_id: "nftart" }, 
//     function(error, result) {console.log(result);
//     return res.status(200).json(result.secure_url);
//     });
// }


module.exports = {
    imageUpload
}
