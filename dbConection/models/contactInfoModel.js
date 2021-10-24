const mongoose = require("mongoose");
const validator = require("validator");


const ContactInfoSchema = new mongoose.Schema({
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid ");
      }
    },
  },
 
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value, ["ar-EG"]))
        throw new Error("invalid phone Number ");
    },
  },
 
  status: { type: Boolean, default: false },
},{ timestamps: true });

const ContInfo = mongoose.model("ContInfo", ContactInfoSchema);
module.exports = ContInfo;