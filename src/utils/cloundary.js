const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: process.env.CLOUNDARY_NAME, 
    api_key: process.env.CLOUNDARY_APIKEY, 
    api_secret: process.env.CLOUNDARY_SECRET
});

const uploadfiles = async (localpath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            folder: folderName
        }).catch((error)=>{console.log(error)});

        return uploadResult

    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {
    uploadfiles,
}
