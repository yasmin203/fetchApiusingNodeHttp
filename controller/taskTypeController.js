const { ObjectId } = require("bson");
const db = require("../database/db");

class TaskType {
  static addTaskType = (req, res) => {
    res.render("addTaskType");
  };
  static addTaskTypeData = (req, res) => {
    db((err, dbCilent) => {
      // console.log(addTask())
      if (err) res.send("database error");
      dbCilent
        .collection("taskType")
        .insertOne(req.body)
        .then(() => res.redirect("/"))
        .catch(() => res.send("error"));
    });
  };
  
  static home = (req, res) => {
    db((err, dbCilent) => {
      if (err) res.send("database error");
      dbCilent
        .collection("taskType")
        .find()
        .toArray((e, allTaskTypes) => {
          if (e) res.send("fe error");
          res.render("home", {
            allTaskTypes,
            taskTypeStatus: allTaskTypes.length == 0 ? false : true,
          });
        });
    });
  };


}
module.exports = TaskType;
