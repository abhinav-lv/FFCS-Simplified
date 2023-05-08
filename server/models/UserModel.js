const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/ffcstest');

const userSchema = new Schema({
    regNo: {type: String, index:{unique:true}},
    class: Number,      // 21
    school: String,
    name: String,
    email: String,
    imgSrc: String,
    admin: Boolean,
    // to add: save timetables made by that user
});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;