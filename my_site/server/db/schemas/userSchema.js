import mongoose from "mongoose";

const User = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    name: {type: String},
    fullname: {type: String},
    number: {type: String},
    role: {type: String, default: "user"},
    banned: {type: Boolean, default: false},
    createdDate: {type: Date, default: Date.now()},
})

const model = mongoose.model("User", User);

export default model;

