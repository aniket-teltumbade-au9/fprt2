const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_by: { type: String, required: true },
    is_private: { type: Boolean, required: true },
    url: { type: String, required: true }
}, { timestamps: true })

const GalleryModel = mongoose.model('Gallery', GallerySchema)

module.exports = GalleryModel
