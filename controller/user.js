const fs = require("fs");
//read from file
readData = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync("model/data.json"));
    if (!Array.isArray(data)) throw new Error("data not an array");
  } catch (e) {
    data = [];
    console.log(`kan fe error fa 7atena array fady ${e}`);
  }
  return data;
};
//write to file
writeData = (allUsers) => {
  try {
    fs.writeFileSync("model/data.json", JSON.stringify(allUsers));
  } catch (e) {
    console.log(`error in write to file ${e}`);
  }
};

finduserbyid = (allUsers, id) => {
  let userIndex = allUsers.findIndex((el) => {
    return el.id == id;
  });
  return userIndex;
};
class userController {
  static goAll(req, res) {
    res.redirect("/all");
  }

  static home = (req, res) => {
    let data = {
      pageTitle: "show All Users",
    };
    res.render("home", data);
  };
  static all = (req, res) => {
    let allUsers = readData();
    let data = {
      pageTitle: "show All Users",
      allUsers,
      userStatus: allUsers.length > 0 ? true : false,
    };
    res.render("all", data);
  };
  static single = (req, res) => {
    let data = {
      pageTitle: "show single user",
      user: false,
    };
    let id = req.params.id;
    let allUsers = readData();
    let user = allUsers.find((el) => el.id == id);
    if (user) data.user = user;
    res.render("single", data);
  };
  static add = (req, res) => {
    let data = {
      pageTitle: "Add user",
    };
    if (req.query.userName) {
      let user = {
        id: Date.now(),
        name: req.query.userName,
        age: req.query.age,
      };
      let allUsers = readData();
      allUsers.push(user);
      writeData(allUsers);
      res.redirect("/all");
    } else {
      res.render("add", data);
    }
  };

  static edit = (req, res) => {
    let data = {
      pageTitle: "Edit user",
    };
    let allUsers = readData();
    let getuserIndex = finduserbyid(allUsers, req.params.id);
    if (getuserIndex == -1) {
      return res.render("error", {
        pageTitle: "user not found ",
        err: `no user with id ${req.params.id} found `,
      });
    } else {
      res.render("edit", {
        pageTitle: "Edit user ",
        user: allUsers[getuserIndex],
      });
    }
  };
  static update = (req, res) => {
    let allUsers = readData();
    let getuserIndex = finduserbyid(allUsers, req.params.id);
    allUsers[getuserIndex].name = req.body.name;
    allUsers[getuserIndex].age = req.body.age;

    // allUsers.push(getuserIndex);
    writeData(allUsers);
    res.redirect("/");
  };
  static delete(req, res) {
    let allUser = readData();
    let getuserIndex = finduserbyid(allUser, req.params.id);

    if (getuserIndex == -1)
      res.render("error", {
        pageTitle: "User Not Found",
        err: `No user With id ${req.params.id}`,
      });
    else {
      allUser.splice(getuserIndex,1);
      // allUser.push(getuserIndex);
      writeData(allUser);
      res.redirect("/");
    }
  }

  static addPost(req, res) {
    let data = { pageTitle: "Add new user" };
    res.render("addPost", data);
  }
  static sendData(req, res) {
    let user = { id: Date.now(), name: req.body.userName, age: req.body.age };
    let allUsers = readData();
    allUsers.push(user);
    writeData(allUsers);
    res.redirect("/all");
  }
}

module.exports = userController;
