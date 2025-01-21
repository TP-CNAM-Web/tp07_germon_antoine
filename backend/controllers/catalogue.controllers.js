const db = require("../models");
const Catalogue = db.catalogue;

exports.get = (req, res) => {
    Catalogue.findAll().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};
