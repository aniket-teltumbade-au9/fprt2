const { imageUpload, privateImages, publicImages, deleteImage, updateImage } = require('../controllers/galleryController')
const authVerify = require('../middlewares/authVerify')
const uploadFile = require('../middlewares/uploadFile')

var galleryRoute = require('express').Router()

galleryRoute.post('/image_upload', [uploadFile, authVerify], imageUpload)
galleryRoute.get('/my_gallery', authVerify, privateImages)
galleryRoute.get('/all', authVerify, publicImages)
galleryRoute.post('/delete',authVerify, deleteImage)
galleryRoute.post('/update',authVerify, updateImage)

module.exports = galleryRoute