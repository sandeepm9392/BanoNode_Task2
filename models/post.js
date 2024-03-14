const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments:{
        type:[String],
        default:[],

    }

}, { timestamps: true });


module.exports =  mongoose.model("Post", PostSchema)