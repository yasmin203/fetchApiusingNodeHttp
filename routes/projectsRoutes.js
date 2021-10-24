const router= require ('express').Router()
const ProjectController =require('../controllers/projectsController')
const auth = require ('../middleware/user.auth')
const admin = require ('../middleware/admin.auth')


// Project dash crud
router.post('/add',[auth,admin],ProjectController.add)
router.patch('/edit/:id',[auth,admin],ProjectController.edit)
router.get('/showone/:id',[auth,admin],ProjectController.showone)
router.get('/showall',[auth,admin],ProjectController.showAll)
router.delete('/del/:id',[auth,admin],ProjectController.del)
module.exports= router