const User = require('./../models/user');
module.exports = {
    login(req, res){
        //do something
    },
    logout(req, res){
        //do something
    },
    async signUp(req, res){
        try {
            let user = new User(req.body);
            await user.create();
            res.send(user.getSafeData());
        } catch (err) {
            console.log(err);
            res.send({error:'Impossible to create user'});
        }
    }
};