const GalleryModel = require("../models/galleryModel")

var mongoose = require("mongoose");

exports.imageUpload = async (req, res) => {
    const { title, description, is_private } = req.body
    const url = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`
    const image_by = req.user.username
    GalleryModel.create({ title, description, image_by, url, is_private: is_private == "true" ? true : false }, async (err, record) => {
        if (err) {
            res.send({ err })
        }
        else {
            await res.send({ msg: "Image Added Successfully!" })
        }
    })
}

exports.privateImages = async (req, res) => {
    GalleryModel.find({ username: req.user.username }, async (err, records) => {
        if (err) {
            res.send({ err })
        }
        else {
            await res.send(records)
        }
    })
}
exports.publicImages = async (req, res) => {
    GalleryModel.find(async (err, records) => {
        if (err) {
            res.send({ err })
        }
        else {
            let newRecords = records.map({ ...records, own_by_me: req.user.username === records.image_by ? true : false })
            await res.send(newRecords)
        }
    })
}
exports.deleteImage = async (req, res) => {
    const { id } = req.params
    const _id = mongoose.Types.ObjectId(id)
    const { username } = req.user
    GalleryModel.findOne({ _id }, (ferr, frecords) => {
        if (ferr) {
            res.send({ err: ferr });
        }
        else {
            if (frecords.image_by === username) {
                GalleryModel.deleteOne({ _id }, (derr, drecords) => {
                    if (derr) {
                        res.send({ err: derr });
                    }
                    else {
                        res.send({ msg: "Image deleted successfully!" })
                    }
                })
            }
            else {
                res.send({ err: "You are not authorized to perform this operation" });
            }
        }
    })
}
exports.updateImage = async (req, res) => {
    const { id } = req.params
    const _id = mongoose.Types.ObjectId(id)
    const { username } = req.user
    const { body } = req
    GalleryModel.findOne({ _id }, (ferr, frecords) => {
        if (ferr) {
            res.send({ err: ferr });
        }
        else {
            if (frecords.image_by === username) {
                GalleryModel.updateOne({ _id }, body, (uerr, urecords) => {
                    if (derr) {
                        res.send({ err: uerr });
                    }
                    else {
                        res.send({ msg: "Image updated successfully!" })
                    }
                })
            }
            else {
                res.send({ err: "You are not authorized to perform this operation" });
            }
        }
    })
}