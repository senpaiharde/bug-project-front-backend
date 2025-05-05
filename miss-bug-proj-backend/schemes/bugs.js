import { Schema, model } from 'mongoose';



const bugSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    severity: {type: Number, min: 1, max:5, },
    ownerId : {type: Schema.Types.ObjectId, ref: user, required}
},{timestamps:true})

export const Bug = model('bug',bugSchema)