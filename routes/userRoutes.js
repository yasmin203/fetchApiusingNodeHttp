const router = require("express").Router();
const UserController = require("../controllers/userController");
const upload = require("../middleware/fileUpload");
const auth = require("../middleware/user.auth");
const admin = require("../middleware/admin.auth");

router.post("/register", UserController.register); //done
router.patch("/activate/:id", UserController.activateUser); //done
router.post("/login", UserController.login); //  no email recieved
router.get('/profile', auth, UserController.profile)
router.post("/logout", auth, UserController.logout); //done
router.post('/addImg', auth, upload.single("img"), UserController.addImg)

// user dash crud
router.post('/adduser', [auth, admin], UserController.addUser)
router.patch('/edit/:id', [auth, admin], UserController.editUser)
router.get('/showone/:id', [auth, admin], UserController.showone)
router.get('/showall', [auth, admin], UserController.showAll)
router.delete('/del/:id', [auth, admin], UserController.del)

module.exports = router
