const jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const { AVATAR_PATH } = require("./config");

/**
 * function to upload profile image
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.uploadImage = async (req, res) => {
    // get the request bodies
    const data = req.body.img_string,
        mobileNumber = req.body.mobile_number;

    // convert base64 string to image using buffer
    const buffer = await Buffer.from(data, 'base64');

    // reduce the image quality to 50% and write in disk
    await jimp.read(buffer)
        .then(img => {
            img.quality(5)
                .write(`${AVATAR_PATH}${mobileNumber}.jpg`);
            return res.status(200)
                .json({'message': 'Image upload successful'});
        })
        .catch(err => {
            return res.status(400)
                .json({'message': err.message});
        });
}

/**
 * Function to get the uploaded profile image
 * @param req
 * @param res
 * @returns {any}
 */
exports.getUploadedImage = (req, res) => {
    // get the image param and file path
    const image = req.params.image,
        filePath = path.join(__dirname, `../${AVATAR_PATH}${image}`);

    // check if file exists
    if (fs.existsSync(filePath))
        // send file
        res.sendFile(filePath);
    else
        // return 400 error
        return res.status(400)
            .json({'message': 'Unable to find the file'});
}