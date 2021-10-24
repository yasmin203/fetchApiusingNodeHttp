const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 6,
    maxlength: 20,
    required: true,
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
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value, ["ar-EG"]))
        throw new Error("invalid phone Number ");
    },
  },
  image: {
    type: String,
    trim: true,
  },
  isAdmin:{type:Boolean},
  address: { type: String, trim: true },
  status: { type: Boolean, default: false },
  tokens: [{ token: { type: String, required: true } }, { timestamps: true }],
});

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.password;
  delete data.__v;
  delete data.tokens;
  return data;
};

userSchema.pre("save", async function () {
  let user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 12);
  // user.updatedAt= Date.now()
});
userSchema.statics.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("email not found");
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) throw new Error("invalid password");
  return user;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id ,isAdmin:this.isAdmin}, process.env.JWTTOKEN);
  // user.tokens.push({token})
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
