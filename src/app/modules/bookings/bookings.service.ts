import { endTime, getAvailableSlots, startTime } from "./booking.utils";
import { TBooking } from "./bookings.interface"
import { Booking } from "./bookings.model"

const createBooking = async(payload:TBooking) =>{
    const isBooked = "confirmed";
    const updatePayloadWithPayableAmount = {...payload,isBooked};

    const result = (await (await Booking.create(updatePayloadWithPayableAmount)).populate("user")).populate("facility") 
    return result;

}
const getAllBooking = async() =>{
    const result = await Booking.find().populate("facility").populate("user");
    return result;
}

const getBookingsFromFacility = async(id:string) =>{
    const result = await Booking.find({facility:id})
    return result
}

const getSingleUserBookings = async(id:string) =>{
    const result = await Booking.find({
        user: id,
        isBooked: { $ne: "canceled" }
    })
    return result;
}

const deleteBookings = async(id:string) =>{
    const result = await Booking.findByIdAndUpdate(id,{isBooked:"canceled"},{new:true})
    return result
}

const checkSlots = async(date:string) =>{
    const startTimes = [...startTime]
    const endTimes = [...endTime]
    
    const bookedSlots = await Booking.find(
        {
            date:date,
            isBooked: { $ne: "canceled" }
        }
    ).select("startTime endTime")
    const availableSlots = getAvailableSlots(startTimes, endTimes, bookedSlots as Partial<TBooking>[]);
    return availableSlots
}


export const bookingServices = {
    createBooking,
    getAllBooking,
    deleteBookings,
    getSingleUserBookings,
    checkSlots,
    getBookingsFromFacility
}