const router = require('express').Router();
const { uploadImage, getUploadedImage, deleteUploadedImage } = require('./controller');
const { validateUploadImage, isRequestValidated } = require('./validator');

router.get('/', function (req, res) {
    return res.status(200)
        .send({
            status: 200,
            success: true
        });
})

router.post('/upload/image', validateUploadImage, isRequestValidated, uploadImage);
router.get('/image/avatar/:image', getUploadedImage);
router.get('/remove/image/avatar/:image', deleteUploadedImage);

module.exports = router;
