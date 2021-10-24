const mongoose = require("mongoose");
const validator = require("validator");

const ProjectsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  features: {
    type: String,
    trim: true,

  },
  image:{
    type:String,
    trim:true
},

  isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
  );

const Project = mongoose.model("Project", ProjectsSchema);
module.exports = Project;
