import { Schema, model } from 'mongoose';


const bugSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    severity: {type: String, required: true},
    ownerId : {type: String, enum: ['user','admin'],default : 'user'}
},{timestamps:true})

export const Bug = model('bug',bugSchema)