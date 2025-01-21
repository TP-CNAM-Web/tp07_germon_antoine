module.exports = (sequelize, Sequelize) => {
    const Utilisateurs = sequelize.define("utilisateurs", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pass: {
            type: Sequelize.STRING,
        },
    });
    return Utilisateurs;
};
