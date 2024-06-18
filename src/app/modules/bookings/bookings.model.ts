import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";


const bookingModel = new Schema<TBooking>({
    date:{
        type: String,
        required: [true,"Booking date is required"]
    },
    startTime:{
        type:String,
        required: [true,"Start Time is required"]
    },
    endTime:{
        type:String,
        required: [true,"End Time is required"]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: [true,"Which user you want is required"]
    },
    facility:{
        type: Schema.Types.ObjectId,
        ref:"Facilities",
        required: [true,"Which facility you want is required"]
    },
    payableAmount:{
        type:Number,
        required: [true,"Payable amount is required"]
    },
    isBooked:{
        type:String,
        enum:['confirmed', "unconfirmed", "canceled"]
    }

})



export const Booking = model<TBooking>("Booking",bookingModel)