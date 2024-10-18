import { v2 as cloudinary } from 'cloudinary';




 cloudinary.config({ 
    cloud_name:CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});


const uploadOnCloudinary  = async  (localFilePath) => {

    try {

        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"})
        // file Uploaded
        console.log(`file uploded from file path ${localFilePath} Public Url ${response.url}`);
        
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
        return null;

        
    }
}

export {uploadOnCloudinary}