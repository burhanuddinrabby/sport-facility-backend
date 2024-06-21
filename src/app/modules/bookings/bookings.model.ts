import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";


const bookingModel = new Schema<TBooking>({
    date:{
        type: String,
        required: true
    },
    startTime:{
        type:String,
        required: true
    },
    endTime:{
        type:String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    facility:{
        type: Schema.Types.ObjectId,
        ref:"Facilities",
        required: true
    },
    payableAmount:{
        type:Number,
    },
    isBooked:{
        type:String,
        enum:['confirmed', "unconfirmed", "canceled"]
    }

})



export const Booking = model<TBooking>("Booking",bookingModel)