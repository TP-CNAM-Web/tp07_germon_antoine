module.exports = (sequelize, Sequelize) => {
    const Catalogue = sequelize.define("catalogue", {
        reference: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        prix: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Catalogue;
};
