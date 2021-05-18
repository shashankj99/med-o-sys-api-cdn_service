require('dotenv').config()

module.exports = {
    IMAGE_BASE_PATH: process.env["IMG_PATH"],
    AVATAR_PATH: process.env["IMG_PATH"] + "/avatars/"
}