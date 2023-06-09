import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registrar usuario
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({
                message: 'Este nombre de usuario ya está en uso.',
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        await newUser.save();

        res.json({
            newUser,
            token,
            message: 'Registro exitoso.',
        });
    } catch (error) {
        res.json({ message: 'Error al crear usuario.' });
    }
};

// Iniciar sesión de usuario
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                message: 'Este usuario no existe.',
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Contraseña incorrecta.',
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        res.json({
            token,
            user,
            message: 'Has iniciado sesión correctamente.',
        });
    } catch (error) {
        res.json({ message: 'Error al iniciar sesión.' });
    }
};

// Obtener mi información
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: 'Este usuario no existe.',
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        res.json({
            user,
            token,
        });
    } catch (error) {
        res.json({ message: 'No tienes acceso.' });
    }
};