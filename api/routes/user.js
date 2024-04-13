const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, addUser } = require('../models/Users'); // Adjust path as necessary

const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).send('User already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword, role };
        await addUser(newUser);
        res.status(201).send('User created.');
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Authentication failed.');
        }
        const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};



module.exports = { register, login };
