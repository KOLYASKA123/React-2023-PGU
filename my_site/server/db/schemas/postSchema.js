import mongoose from "mongoose";

const Post = new mongoose.Schema({
    title: {type: String, length: 200, required: true},
    shortDescription: {type: String, required: true},
    fullDescription: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
})

const model = mongoose.model("Post", Post);

export default model;

