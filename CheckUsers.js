const validator = require('validator');
class myUserValidador{
    static isEmail(email){
        if (!validator.isEmail(email)){
            console.log(' email is invalid')
            return false
        }
        return true
    }
    static isId(id, notUnique){
        if (id.length != 14 || !validator.isNumeric(id) || !['1', '2', '3'].includes(id[0])) {
            console.log(' id is invalid')
            return false
        } else if(notUnique){
            console.log('User is already existed!');
            return false
        }
        return true
    }
    static isName(name){
        if (!validator.isLength(name, {min:3, max:20}) || !validator.isAlpha(name)) {
            console.log('invalid name')
            return false
        }

        return true
    }
    static isJob(job){
        if (!['developer', 'designer','ceo', 'employee'].includes(job)) {
            console.log('invalid job')
            return false
        }
        return true
    }
}

module.exports = myUserValidador