const router=require("express").Router()
const userController=require('../controller/user')

router.get("", userController.goAll)
router.get("/home",userController.home)
router.get("/all",userController.all)
router.get("/single/:id",userController.single)
router.get("/add",userController.add)
router.get("/edit/:id",userController.edit)
router.post("/edit/:id",userController.update)
router.get("/addPost",userController.addPost)
router.post("/addPost", userController.sendData)
router.get("/del/:id",userController.delete)

module.exports=router