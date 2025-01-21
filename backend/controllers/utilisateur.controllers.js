const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");

const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    const payload = {
        user,
        issuedAt: Date.now(),
    };

    const accessToken = jwt.sign({ ...payload, type: "access" }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1800s",
    });

    return { accessToken };
};

const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

exports.registerUser = async (req, res) => {
    const { login, pass } = req.body;

    if (!login || !pass) {
        return res.status(400).json({ message: "All fields are required." });
    }

    Utilisateurs.findOne({ where: { login: login } })
        .then(async (data) => {
            if (data) {
                return res
                    .status(400)
                    .json({ message: "Login already exists." });
            }

            //find biggest id in the database and increment it by 1
            Utilisateurs.findAll({ order: [["id", "DESC"]] })
                .then((data) => {
                    let userId = 1;
                    if (data.length > 0) {
                        userId = parseInt(data[0].id) + 1;
                    }

                    Utilisateurs.create({
                        id: userId,
                        login: login,
                        pass: pass,
                    });
                    res.status(201).json({
                        message: "User created successfully.",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message:
                            err.message ||
                            "An error occurred while creating the user.",
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message || "An error occurred while creating the user.",
            });
        });
};

// Find a single Utilisateur with an login
exports.loginUser = (req, res) => {
    const utilisateur = {
        login: req.body.login,
        pass: req.body.pass,
    };

    // Test
    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(utilisateur.login) && pattern.test(utilisateur.pass)) {
        Utilisateurs.findOne({ where: { login: utilisateur.login } })
            .then((data) => {
                if (data) {
                    const user = {
                        id: data.id,
                        login: data.login,
                    };

                    let accessToken = generateAccessToken(user);
                    res.setHeader("Authorization", `Bearer ${accessToken}`);

                    res.status(200).json({ message: 'Login successful.', accessToken, login: user.login });
                } else {
                    res.status(404).send({
                        message: `Cannot find Utilisateur with login=${utilisateur.login}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(400).send({
                    message:
                        "Error retrieving Utilisateur with login=" +
                        utilisateur.login,
                });
            });
    } else {
        res.status(400).send({
            message: "Login ou password incorrect",
        });
    }
};

exports.getUser = (req, res) => {
    const { id } = req.user;

    Utilisateurs.findOne({ where: { id: id } })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    login: data.login,
                });
            } else {
                res.status(404).json({ message: "User not found." });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message ||
                    "An error occurred while retrieving the user.",
            });
        });
};
