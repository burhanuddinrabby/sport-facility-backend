import { TFacility } from "./facilities.interface"
import { Facilities } from "./facilities.model"

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facilities.create(payload)
    return result
}

const getAllFacilityFromDB = async () => {
    const result = await Facilities.find({ isDeleted: false })
    return result
}

const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    const { ...updatedFields } = payload
    const result = await Facilities.findByIdAndUpdate(id, updatedFields, { new: true })
    return result
}

const deleteFacilityFromDB = async (id: string) => {
    const deleteFacilities = await Facilities.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return deleteFacilities
}

export const facilitiesServices = {
    createFacilityIntoDB,
    getAllFacilityFromDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
}