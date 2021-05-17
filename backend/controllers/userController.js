const UserModel = require("../models/userModel")
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
    const { username, email, password } = req.body
    const hashPassword = await bcrypt.hashSync(password, 8)
    UserModel.create({ username, email, password: hashPassword }, (err, record) => {
        if (err) {
            res.send({ err })
        }
        else {
            res.send({ msg: "Registered SuccesssfullY!" })
        }
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    UserModel.findOne({ email: email }, async (err, record) => {
        if (err) {
            res.send({ err })
        }
        else {
            if (bcrypt.compareSync(password, record.password)) {
                let token = await jwt.sign(
                    {
                        email: record.email,
                        username: record.username
                    },
                    "decodedtoken")
                res.send({ accessToken: token })
            }
            else {
                res.send({ err: "Something went wrong!" })
            }
        }
    })
}
exports.profile = async (req, res) => {
    const { email } = req.user
    UserModel.findOne({ email: email }, async (err, record) => {
        if (err) {
            res.send({ err })
        }
        else {
            res.send(record)
        }
    })
}