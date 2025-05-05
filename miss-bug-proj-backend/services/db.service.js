import mongoose from "mongoose";

export function connectDB() {
    const url = process.env.MONGO_URI;
    return mongoose.connect(url, {
        useNewUrlParse: true,
        useUnifiedTopology : true,

    })
    .then(() => console.log('connected to mongo atlas'))
    .catch(err => {
        console.log('something went wrong on connection to mongo atlas')
        process.exit(1);
    })
}