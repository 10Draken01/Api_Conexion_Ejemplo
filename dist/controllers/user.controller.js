"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
async function validateEmail(email) {
    return await user_model_1.UserModel.findOne({ email });
}
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (await validateEmail(email))
            return res.status(400).json({ error: 'Email ya existe' });
        const newUser = await user_model_1.UserModel.create({ email: email, password: password });
        const token = (0, jwt_1.generateToken)(newUser._id);
        res.status(200).json({ message: 'Usuario registrado con exito', token: token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await validateEmail(email);
        if (!(user))
            return res.status(400).json({ error: 'Email no existe' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.loginUser = loginUser;
