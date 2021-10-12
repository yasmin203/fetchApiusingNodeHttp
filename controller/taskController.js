const { ObjectId } = require("mongodb");
const db = require("../database/db");
const allTaskTypes = require("../controller/taskTypeController");

class Task {
  static addTask = (req, res) => {
    //find types allTypes
    db((err, dbCilent) => {
      // console.log(addTask())
      if (err) res.send("database error");
      dbCilent
        .collection("taskType")
        .find()
        .toArray((err, data) => {
          res.render("addTask", { allTaskTypes: data });
        });
    });
  };
  static addTaskData = (req, res) => {
    db((err, dbCilent) => {
      // console.log(addTask())
      if (err) res.send("database error");
      dbCilent
        .collection("task")
        .insertOne(req.body)
        .then(() => res.redirect("/"))
        .catch(() => res.send("error"));
    });
  };
  static home = (req, res) => {
    db((err, dbCilent) => {
      if (err) res.send("database error");
      dbCilent
        .collection("task")
        .find()
        .toArray((e, allTasks) => {
          if (e) res.send("fe error");
          res.render("home", {
            allTasks,
            taskStatus: allTasks.length == 0 ? false : true,
          });
        });
    });
  };
  static showSingle = (req, res) => {
    let id = new ObjectId(req.params.id);
    db((err, dbCilent) => {
      if (err) res.send("database error");
      dbCilent.collection("task").findOne({ _id: id }, (err, task) => {
        if (err) return console.log(err);
        res.render("showSingle", { task });
      });
    });
  };

  static editTask = (req, res) => {
    let id = new ObjectId(req.params.id);
    db((err, dbCilent) => {
      if (err) res.send("database error");
      dbCilent.collection("task").findOne({ _id: id }, (err, task) => {
        res.render("editTask", {task});
      });
    });
  };
  static sendUpdates = (req, res) => {
    let id = new ObjectId(req.params.id);
    let newData = req.body;
    db((err, dbCilent) => {
      if (err) res.send("database error");
      dbCilent
        .collection("task")
        .updateOne(
          { _id: id },
          {
            $set: {
              taskTitle: newData.taskTitle,
              taskType: newData.taskType,
              taskDetails: newData.taskDetails,
            },
          }
        )
        .then(res.redirect("/"))
        .catch((e) => {
          res.send("error in edit");
        });
    });
  };
  static del = (req, res) => {
    let id = new ObjectId(req.params.id);
    db((err, dbCilent) => {
      if (err) res.send("database error");
      dbCilent
        .collection("task")
        .deleteOne({ _id: id })
        .then(() => res.redirect("/"))
        .catch((e) => res.send(e));
    });
  };
}
module.exports = Task;
