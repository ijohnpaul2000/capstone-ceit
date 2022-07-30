const generateSecretKey = () => {
  let result = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charLength = chars.length;

  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
};

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
      secretKey: {
        type: DataTypes.STRING,
        defaultValue: generateSecretKey(),
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
