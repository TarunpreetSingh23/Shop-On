import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      //required: true,
    },

    description: {
      type: String,
     // required: true,
    },


    image: {
      type: String, // store image URL or /public path
     // required: true,
    },


    price: {
      type: String,
     // required: true,
    },


    category: {
      type: String, // e.g., "Repair", "Massage"
     // required: true,

    },



  },


  { timestamps: true }
);
const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;








