import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    _id:          { type: String },
    email: {type: String, required: true, unique: true},
    passwordHash: { type: String, default: '' },
    fullname: {type: String, required: true},
    role : {type: String, enum: ['user','admin'],default : 'user'},
},{timestamps:true})

export const User = model('user',userSchema)