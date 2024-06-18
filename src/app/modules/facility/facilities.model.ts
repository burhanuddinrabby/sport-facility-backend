import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";


const facilitiesModel = new Schema<TFacility>({
  name:{
    type:String,
    required:true ,
    unique : true
  },
  description: {
    type: String,
    required: [true, "description is required"],
    unique: true,
  },
  pricePerHour: {
    type: Number,
    required: [true, "Price is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// facilitiesModel.pre("save",async function(next){

//     const isExistsFacilities = await Facilities.findOne({name:this.name})
//     if(isExistsFacilities){
//         throw new AppError(401,"facilities already exists!")
//     }
//     next()
// })

export const Facilities = model<TFacility>("Facilities", facilitiesModel);
