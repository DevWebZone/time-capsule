import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password : {
        type: String,
        required: true,
        minlength: 6
    },
},
{
    timestamps: true
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);;
module.exports = User;