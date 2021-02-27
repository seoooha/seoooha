module.exports = function(sequelize, DataTypes){
    var board = sequelize.define("Board",{
        bo_no : { field: 'bo_no', type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true},
        bo_name : { field: 'bo_name', type: DataTypes.STRING(16)},
        bo_password : { field: 'bo_password', type: DataTypes.STRING(512)},
        bo_title : { field: 'bo_title', type: DataTypes.STRING(32)},
        bo_contents : { field: 'bo_contents', type: DataTypes.TEXT()},
        bo_reg_date : { field: 'bo_reg_date', type: DataTypes.DATE},
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first pCarameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'board'
    });
    return board;
};