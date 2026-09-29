import mongoose from "mongoose";
import {Schema} from 'mongoose';

const sessionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },


})

const Session = mongoose.model("Session",sessionSchema);

export default Session;