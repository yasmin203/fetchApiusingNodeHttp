
const admin = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return res.status(403).send("unauthorized user your not Admin  ");
      }
    
      next();
}
 

module.exports = admin;
