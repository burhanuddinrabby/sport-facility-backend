import catchAsync from "../../utils/catchAsync";

import { facilitiesServices } from "./facilities.service";

const createFacility = catchAsync(async (req, res) => {
  
  const result = await facilitiesServices.createFacilityIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility added successfully",
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  try {
    const result = await facilitiesServices.getAllFacilityFromDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All Facilities retrieved Successfully",
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

const updateFacility = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await facilitiesServices.updateFacilityIntoDB(id, req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: " Facilities updated Successfully",
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
const deleteFacility = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await facilitiesServices.delteFacilityFromDB(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: " Facilities Deleted Successfully",
      data: result,
    });
  } catch (error) {
        res.status(200).json({
        success: false,
        statusCode: 404,
        message: " Failed to delete facilities !",
        
        
  })
}
});

export const facilitiesController = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility
};
