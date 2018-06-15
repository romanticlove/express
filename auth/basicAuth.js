const User = require('./../models/user');
const basicAuth = require('basic-auth');

module.exports = async function (req, res, next) {
    try {
        function unauthorized(res) {
            return res.send(401,{error:'Unauthorized'});
        }

        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        }

        let userFound = await User.findByEmailPassword(user.name, user.pass);
        if (userFound)
            return next();

        return unauthorized(res);
    } catch (err) {
        console.log(err);
        return unauthorized(res);
    }
};
;