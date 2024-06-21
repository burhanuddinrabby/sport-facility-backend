
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { User } from "../user/user.model";
import { bookingServices } from "./bookings.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { facilitiesServices } from "../facility/facilities.service";

const createBookingController = catchAsync(async (req, res) => {
  const tokenWithBearer = req.headers.authorization as string;
  const token = tokenWithBearer.split(" ")[1];

  const verifiedToken = jwt.verify(
    token as string,
    config.jwt_access_secret as string
  );

  const { email } = verifiedToken as JwtPayload;

  const userinfo = await User.findOne({ email: email });

  req.body.user = userinfo?._id;
  const bookingDataCheckTime = await bookingServices.getBookingsFromFacility(req.body?.facility)

  const startTimeHours = parseInt(req.body?.startTime.split(":")[0]);
  const endTimeHours = parseInt(req.body?.endTime.split(":")[0])

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const checkSameTimeSlot = bookingDataCheckTime.map((time) => {
    const bookedStartTimeHours = parseInt(time.startTime.split(":")[0]);
    const bookedEndTimeHours = parseInt(time.endTime.split(":")[0]);
    if (time.date === req.body?.date && (startTimeHours >= bookedStartTimeHours && startTimeHours < bookedEndTimeHours)) {
      throw new AppError(401, "This facility is not available at this time slot try another slot")
    }else if (startTimeHours === endTimeHours){
      throw new AppError(401, "Start time and end time can't be same")
    }
  }) 
  const facilityData = await facilitiesServices.getSingleFacilityFromDB(req.body?.facility)
  const payPerHour = facilityData ? facilityData.pricePerHour : 0

  const bookingHours = (endTimeHours - startTimeHours)
  const payableAmount = bookingHours * payPerHour

  req.body.payableAmount = payableAmount;

  const result = await bookingServices.createBooking(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookingController = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBooking();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
const getSingleBookingController = catchAsync(async (req, res) => {
  const tokenWithBearer = req.headers.authorization as string;
  const token = tokenWithBearer.split(" ")[1];

  const verifiedToken = jwt.verify(
    token as string,
    config.jwt_access_secret as string
  );

  const { email } = verifiedToken as JwtPayload;

  const user = await User.findOne({ email: email });
  if(!user){
    throw new AppError(401, "User not found")
  }
  const userId = user?._id.toString() as string;

  const result = await bookingServices.getSingleUserBookings(userId);
  // console.log("result from controller boking", result);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
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


  if (!date) {
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
