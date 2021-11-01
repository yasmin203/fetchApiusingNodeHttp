const mongoose = require("mongoose");
//const generateTxt = require("../../ntig11/ntig11/ntig11/session9-10/helper/generateEmailTxt");
const User = require("../dbConection/models/UserModel");
const emailSetting = require("../helper/emailHelper");

class UserController {
  static register = async (req, res) => {
    try {
      let user = new User(req.body);
      await user.save();
      emailSetting(user.email, "new registration");
      res.send({
        apiStatus: true,
        message: "registered successfully",
        data: user,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: " registering new user faild",
      });
    }
  };
  // activate user
  static activateUser = async (req, res) => {
    let userId = req.params.userId;
    try {
      let user = await User.findOne(userId);
      if (!user)
        res.status(404).send({
          apiStatus: false,
          message: "user not found to be activated",
          data: user,
        });
      res.status(200).send({
        apiStatus: true,
        message: "user registers and activated",
        data: user,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "faild to activate user",
      });
    }
  };
  // user login
  static login = async (req, res) => {
    try {
      const userData = await User.loginUser(req.body.email, req.body.password);
      const token = await userData.generateToken();

      res.status(200).send({
        apiStatus: true,
        data: { userData, token },
        message: "login success",
      });
    } catch (e) {
      res
        .status(500)
        .send({ apiStatus: false, data: e.message, message: " login faild " });
    }
  };
  //user profile

  static profile = async (req, res) => {
    res.status(200).send({
      apiStatus: true,
      data: req.user,
      message: "user data loaded"
    })
  }


  // user logout
  static logout = async (req, res) => {
    try {
      res.send({ apiStatus: true, data: req.user, message: "user loged out " });
    } catch (e) {
      res.send(e);
    }
  };

  static addImg = async (req, res) => {
    try {
      if (!req.file) throw new Error("file not found");
      req.user.image = req.file.path.split("\\").join('/') // \\  /
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        data: req.user,
        message: "profile image updated",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error add image",
      });
    }
  };


  // adding user
  static addUser = async (req, res) => {
    try {
      const addUser = new User(req.body);
      await addUser.save();
      console.log("dfsdfsfsrr")
      res.send(
        {

          data: req.body,
          message: "user added sucssfly"

        });
    } catch (error) {
      res.status(500).send({ error, message: "faild to add new user " });
    }
  };
  static showone = async (req, res) => {
    try {
      const user = await User.findOne(req.params._id);
      if (!user) res.status(404).send("user not fount to show it ");
      res.status(200).send({ user, message: "your viewing single user now " });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  static showAll = async (req, res) => {
    try {
      const user = await User.find();
      if (!user) res.status(404).send("no users yet !! ");
      res.status(200).send({ user, message: "your viewing all users now " });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //edit  user
  static editUser = async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(req.params.id, req.body);
      // await User.save();
      res.send({ data, message: "user edited sucssfly" });
    } catch (error) {
      res
        .status(500)
        .send({ error: error.message, message: "faild to edit user " });
    }
  };
  // delete user

  static del = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) res.status(404).send("No user found");
      res.status(200).send("user deleted ");
    } catch (error) {
      res.status(500).send(error);
    }
  };


  // admin approve buy request from user 

  static approve = async (req, res) => {
    try {

    } catch (error) {
      res.status(500).send(error);
    }
  };
  //end class
}
module.exports = UserController;
