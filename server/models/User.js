module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      _userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "tbl_users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user", collate: "en_US", order: "ASC" }],
        },
      ],
    }
  );
  return User;
};
