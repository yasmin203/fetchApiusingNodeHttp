const jwt = require("jsonwebtoken");
const User = require("../dbConection/models/UserModel");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // res.send(token);
    let decoded = jwt.verify(token, "Real2021");
    // res.send(decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("unauthorized user ");
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res
      .status(500)
      .send({ apiStatus: false, data: e, message: "unauthorized" });
  }
};

module.exports = auth;
