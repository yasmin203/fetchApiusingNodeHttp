const router = require('express').Router()
const Task = require('../controller/taskController')
const TaskType = require('../controller/taskTypeController')

 router.get("/addTask", Task.addTask)
router.post("/addTask", Task.addTaskData)
router.get("/addTaskType", TaskType.addTaskType)
router.post("/addTaskType", TaskType.addTaskTypeData)


router.get("/", Task.home)
router.get("/all", Task.home)
router.get("/single/:id", Task.showSingle)
 router.get("/edit/:id", Task.editTask)
 router.post("/edit/:id", Task.sendUpdates)
router.get("/delete/:id", Task.del)

module.exports = router