let express = require('express');
let authController = require('./controllers/authController');
let usersController = require('./controllers/usersController');


let protectedRouter = express.Router();
let unprotectedRouter = express.Router();

module.exports = (auth) => {

    unprotectedRouter.route('/login').post(authController.login);
    unprotectedRouter.route('/sign-up').post(authController.signUp);
    protectedRouter.route('/logout').post(authController.logout);

    protectedRouter.route('/users').get(usersController.getUsers);
    protectedRouter.route('/users/:id').get(usersController.getUser);
    protectedRouter.route('/users/:id').delete(usersController.deleteUser);
    protectedRouter.route('/users/:id').put(usersController.updateUser);

    return {
        protected: protectedRouter,
        unprotected: unprotectedRouter
    };
};