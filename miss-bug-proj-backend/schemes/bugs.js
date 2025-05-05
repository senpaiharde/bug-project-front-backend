import { Schema, model } from 'mongoose';



const bugSchema = new Schema({
    _id:       { type: String },  
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    severity: {type: Number, min: 1, max:5, },
    ownerId : {type: Schema.Types.ObjectId, ref: 'User', required: true}
},{timestamps:true})

export const Bug = model('bug',bugSchema)