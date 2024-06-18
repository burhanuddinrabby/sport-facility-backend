import { Facilities } from "../facility/facilities.model";

import { TBooking } from "./bookings.interface"
import { Booking } from "./bookings.model"

const createBooking = async(payload:TBooking) =>{
    const {startTime,endTime,facility} = payload

    // convert time string to number
    const startTimeHours = parseInt(startTime.split(":")[0]);
    const endTimeHours  =parseInt(endTime.split(":")[0])

    // find facility data and get per hour cost
    const facilityData = await Facilities.findById(facility)
    const payPerHour = facilityData? facilityData.pricePerHour : 0

    const bookingHours = (endTimeHours-startTimeHours) 
    const payableAmount = bookingHours * payPerHour
    // console.log("payableAmount",payableAmount)

    const isBooked = "confirmed"

    const updatePayloadWithPayableAmount = {...payload,payableAmount,isBooked}

    const result = (await Booking.create(updatePayloadWithPayableAmount)).populate("user")
    return result

}
const getAllBooking = async() =>{
    const result = await Booking.find().populate("facility").populate("user")
    return result

}
const getSingleUserBookings = async(id:string) =>{
    // console.log(id ,"i am from service")
    const result = await Booking.find({user: id})
    return result
    // console.log(result,"from single user data get service")
}

const deleteBookings = async(id:string) =>{
    const result = await Booking.findByIdAndUpdate(id,{isBooked:"canceled"},{new:true})
    return result
}

const checkSlots = async(date:string) =>{
    // console.log("check kar",date)
    const avaiableSlots = []

    // define start and end of the day in 24 hr formate: convert minute for match with bookings time 
    const startDay = 0
    const endDay = 24 * 60
    
    

    // convert hr and minute format time to min format
    const hourToMinutes = (time:string) =>{
        const [hour,minute] = time.split(":").map(Number)
        return hour * 60 + minute
    }

    // convert min to hr format 
    const minutesToHours = (minutes :number) => {
        const hours = Math.floor(minutes % 60);
        // console.log(hours,"hours")
        // const mins = minutes % 60;
        // console.log(mins,"mins")
        // return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        return `${hours.toString().padStart(2, '0')}:00`;
    };


    const bookingData = await Booking.find({date:date})
    // console.log("booking data",bookingData)

    const bookedTimeSlots = bookingData.filter((booking)=> {
        const startTime = hourToMinutes(booking.startTime)
        const endTime =  hourToMinutes(booking.endTime)
        // console.log(startTime,endTime)
        return {
            startTime,endTime
        }
    })
    

    // calculate avaiable slots for this day
    let previousEndTime =startDay;
    for(const slot of bookedTimeSlots){
        // console.log("check loop",slot.startTime)
        if(parseInt(slot.startTime) > previousEndTime){
            avaiableSlots.push({
                startTime: minutesToHours(previousEndTime),
                endTime: minutesToHours(parseInt(slot.startTime)) 
            })
        }
        
        previousEndTime = parseInt(slot.endTime)
    }
   

    
    

    // check if there are any slots avaiable there after last booking
    if(previousEndTime < endDay){
        avaiableSlots.push({
            startTime: minutesToHours(previousEndTime),
            endTime: minutesToHours(endDay)
        })
    }
    
    return avaiableSlots
}


export const bookingServices = {
    createBooking,
    getAllBooking,
    deleteBookings,
    getSingleUserBookings,
    checkSlots
}