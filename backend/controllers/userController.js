const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/user');

const SECRET_KEY = 'HELLOHELLOHELLO';
const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

// Generate JWT Tokens
const generateToken = (user) => {
    const payload = {
        userid: user.userid,
        email: user.email,
        username: user.username,
        issuedAt: Date.now(),
    };

    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    return { accessToken, refreshToken };
};

// Register user
exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        userid: `user-${Date.now()}`,
        email,
        username,
        password: hashedPassword,
    };
    users.push(newUser);

    const tokens = generateToken(newUser);
    res.status(201).json({ message: 'User registered successfully.', tokens });
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid password / login not found' });
    }

    const tokens = generateToken(user);
    res.status(200).json({ message: 'Login successful.', tokens, username: user.username });
};

// Get user info
exports.getUser = (req, res) => {
    const { userid } = req.user;

    //we could extract all the information fril the req that comes from the authenticate middleware
    // but I prefer to get the user from the users array to verify that the user still exists
    const user = users.find((user) => user.userid === userid);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const { email, username } = user;
    res.status(200).json({ userid, email, username });
};

// Update user details
exports.updateUser = (req, res) => {
    const { userid } = req.user;
    //password is for now not sent in the request body
    const { email, username, password } = req.body;

    const user = users.find((user) => user.userid === userid);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    if (email) user.email = email;
    if (username) user.username = username;
    if (password) user.password = bcrypt.hashSync(password, 10);

    res.status(200).json({ message: 'User updated successfully.', user });
};