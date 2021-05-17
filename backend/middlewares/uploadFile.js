var multer = require('multer')
var mime= require('mime')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
    }
})
var upload = multer({ storage: storage })
module.exports = upload.single('photo')