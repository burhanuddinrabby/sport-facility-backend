
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { User } from "../user/user.model";
import { bookingServices } from "./bookings.service";
import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction } from "express";
import { Booking } from "./bookings.model";

const createBookingController = catchAsync(async (req, res,next:NextFunction) => {
  try {
    const tokenWithBearer = req.headers.authorization;
  if (!tokenWithBearer) {
    throw new AppError(401, "Unauthorized users!");
  }
  if (tokenWithBearer) {
    const token = tokenWithBearer.split(" ")[1];
    // console.log("after cut bearer", token);

    if (!token) {
      throw new AppError(401, "Unauthorized users!");
    }

    const verifiedToken = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    );
    // console.log(verifiedToken, "from boking contro");

    const { email } = verifiedToken as JwtPayload;
    
    // console.log("email",email)
    const userinfo = await User.findOne({ email: email });
    const userID = userinfo?._id
    // console.log(userinfo?._id ,"user id decoded")

    const newData = {
      ...req.body,
      user: userinfo?._id,
    };

    
    const {startTime:startTimeFromBooking,endTime:endTimeFromBooking,date} = req.body
    const bodyDate = date
    
    // check user booked same time or not
    const bookingDataCheckTime = await Booking.find({user: userID})
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const checkSameTimeSlot = bookingDataCheckTime.map((time)=>{
      if(time.date === bodyDate && time.startTime === startTimeFromBooking && time.endTime === endTimeFromBooking ){
        throw new AppError(401,"This time slot already booked by you")
      }
      // console.log(time.date , bodyDate)
    })
    const result = await bookingServices.createBooking(newData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: result,
    });
  }
  } catch (error) {
    next(error)
  }
});
const getAllBookingController = catchAsync(async (req, res) => {
  try {
    const result = await bookingServices.getAllBooking();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All Booking Retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});
const getSingleBookingController = catchAsync(async (req, res) => {
  try {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(401, "Unauthorized users!");
    }
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(" ")[1];
      // console.log("after cut bearer", token);

      if (!token) {
        throw new AppError(401, "Unauthorized users!");
      }

      const verifiedToken = jwt.verify(
        token as string,
        config.jwt_access_secret as string
      );
      // console.log(verifiedToken)

      const { email } = verifiedToken as JwtPayload;
      // console.log("email ", email);

      const user = await User.findOne({ email: email });
      const userId = user?._id.toString();

      if (userId) {
        try {
          const result = await bookingServices.getSingleUserBookings(userId);
        // console.log("result from controller boking", result);
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Specific User Bookings Retrived successfully",
          data: result,
        });
        } catch (error) {
          res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
          });
        }
      }
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});
const deleteBookingController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.deleteBookings(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: " Booking cancelled successfully",
    data: result,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  // const date = req.query.date
  let date = req.query.date ? req.query.date : new Date();
  // console.log(date,"date 1st")
  const todaysDate = new Date();
  // console.log(todaysDate,"todays date");

  if (date.toString() === todaysDate.toString()) {
      const getTodayDate = (): string => {
      const day = todaysDate.getDate().toString().padStart(2, "0");
      const month = (todaysDate.getMonth() + 1).toString().padStart(2, "0");
      const year = todaysDate.getFullYear().toString();
      return `${year}-${month}-${day}`;
    };

    const modifiedDate = getTodayDate();
    // console.log(modifiedDate,"modifieddate***********")
    date = modifiedDate;
  } 
 

  if(!date){
    throw new Error("date is not define")
  }
  
  
  const result = await bookingServices.checkSlots(date as string);
  // console.log(result.length)
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: " avaiable slots here",
    data: result,
  });
  
});

export const bookingControllers = {
  createBookingController,
  getAllBookingController,
  getSingleBookingController,
  deleteBookingController,
  checkAvailability,
};
