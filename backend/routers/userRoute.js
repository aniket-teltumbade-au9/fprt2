const { signup, login, profile } = require("../controllers/userController");
const authVerify = require("../middlewares/authVerify");

var userRouter = require("express").Router();

userRouter.post('/register', signup);
userRouter.post('/login', login);
userRouter.get('/profile', authVerify, profile);

module.exports = userRouter