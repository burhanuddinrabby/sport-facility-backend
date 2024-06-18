import { z } from "zod";


const createBookingValidation = z.object({
    body:z.object({
        date:z.string({
            required_error:"Date is required"
        }),
        startTime:z.string({
            required_error:"Start time is required"
        }),
        endTime:z.string({
            required_error:"End time is required"
        }),
        user:z.string({
            required_error:"User is required"
        }),
        facility:z.string({
            required_error:"Facility is required"
        }),
        payableAmount:z.number({
            required_error:"Payable amount is required"
        }),
        isBooked:z.enum(['confirmed', "unconfirmed", "canceled"]).optional()
    })
})

export const bookingValidations = {
    createBookingValidation
}