const userModel = require('../models/authModels');

const validator = require('validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SEC_KEY;
    return jwt.sign( { _id }, jwtKey, { expiresIn: "7d" } );
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let User = await userModel.findOne( { email } );

        if (User) return res.status(401).json('A user with this email address already exist');

        if (!username || !email || !password) return res.status(401).json('All fields are required');

        if (!validator.isEmail(email)) return res.status(422).json('Not a valid email address');

        if (!validator.isStrongPassword(password)) return res.status(422).json('Password must consists of special-case characters');

        User = new userModel( { username, email, password } );

        const salt = await bcrypt.genSalt(10);

        User.password = await bcrypt.hash(User.password, salt);

        await User.save();

        const token = createToken(User._id);


        res.status(201).json( { _id: User._id, username, email, token } );
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let User = await userModel.findOne( { email } );

        if (!User) return res.status(422).json('Invalid email address or password');
        const isValidPassword = await bcrypt.compare(password, User.password);

        if (!isValidPassword) return res.status(422).json('Invalid email address or password');

        const token = createToken(User._id);
        
        res.status(200).json( { _id: User._id, username: User.username, email, token } );
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const findUser = async (req, res) => {
    try {
        const { UserId } = req.params;

        let User = await userModel.findById(UserId);

        res.status(200).json(User);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const getUsers = async (req, res) => {
    try {
        let Users = await userModel.find();

        res.status(200).json(Users);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

module.exports = { registerUser, loginUser, findUser, getUsers };