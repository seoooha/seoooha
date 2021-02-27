module.exports = function(sequelize, DataTypes){
    var comment = sequelize.define("Comment",{
        co_no : { field: 'co_no', type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true},
        co_bo_seq : { field: 'co_bo_seq', type: DataTypes.INTEGER(11)},
        co_name : { field: 'co_name', type: DataTypes.STRING(16)},
        co_password : { field: 'co_password', type: DataTypes.STRING(512)},
        co_reg_date : { field: 'co_reg_date', type: DataTypes.DATE},
        co_contents : { field: 'co_contents', type: DataTypes.TEXT()},
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
        tableName: 'comment'
    });
    return comment;
};