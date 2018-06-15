const User = require('./../models/user');
module.exports = {
    async getUsers(req, res){
        try {
            let users = await User.getAllUsers();
            res.send(users);
        } catch (err) {
            res.send({error:'Impossible to fetch all users list'});
        }
    },
    async getUser(req, res){
        try {
            let id = parseInt(req.params.id);
            let user = await User.getUserById(id);
            res.send(user);
        } catch (err) {
            res.send({error:'Impossible to get user by id'});
        }
    },
    async updateUser(req, res){
        try {
            let id = parseInt(req.params.id);
            let user = await User.updateUserBy(id, req.body);
            res.send(user);
        } catch (err) {
            res.send({error:'Impossible to get update by id'});
        }
    },
    async deleteUser(req, res){
        try {
            let id = parseInt(req.params.id);
            let user = await User.deleteUserById(id);
            res.send({success:true});
        } catch (err) {
            res.send({error:'Impossible to delete user by id'});
        }
    }
};