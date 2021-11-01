const Project = require("../dbConection/models/ProjectsModel");

class ProjectsController {


  static addImg = async (req, res) => {
    try {
      if (!req.file) throw new Error("file not found");
      req.project.image = "assets/" + req.file.filename // \\  /
      await req.project.save();
      res.status(200).send({
        apiStatus: true,
        data: req.project,
        message: "project image updated",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error add image",
      });
    }
  };

  // adding project
  static add = async (req, res) => {
    try {
      const addProject = new Project(req.body);
      //res.send(addProject)
      await addProject.save();
      res.send({ addProject, message: "project added sucssfly" });
    } catch (error) {
      res.status(500).send({ error, message: "faild to add new project " });
    }
  };
  //show single project
  static showone = async (req, res) => {
    try {
      const project = await Project.findOne(req.params._id);
      if (!project) res.status(404).send("project not fount to show it ")
      res.status(200).send({ project, message: "your viewing single project now " });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //show all projects
  static showAll = async (req, res) => {
    try {
      const project = await Project.find();
      if (!project) res.status(404).send("no projects yet !! ")
      res.status(200).send({ project, message: "your viewing all projects now " });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //edit  project
  static edit = async (req, res) => {
    try {
      await Project.findByIdAndUpdate(req.params.id, req.body);
      await Project.save();
      res.send({ Project, message: "Project edited sucssfly" });
    } catch (error) {
      res.status(500).send({ error, message: "faild to edit Project " });
    }
  };
  // delete Project

  static del = async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);

      if (!project) res.status(404).send("No project found");
      res.status(200).send("project deleted ");
    } catch (error) {
      res.status(500).send(error);
    }
  };

  //end class
}
module.exports = ProjectsController;
