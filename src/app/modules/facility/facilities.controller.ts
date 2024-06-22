import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { facilitiesServices } from "./facilities.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await facilitiesServices.createFacilityIntoDB(req.body);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to add facility");
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility added successfully",
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  const result = await facilitiesServices.getAllFacilityFromDB();

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facilitiesServices.updateFacilityIntoDB(id, req.body);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update facility");
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: " Facility updated Successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facilitiesServices.deleteFacilityFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete facility");
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility deleted successfully",
    data: result,
  });
});

export const facilitiesController = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility
};
