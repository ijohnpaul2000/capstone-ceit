const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define(
    "Guest",
    {
      _guestId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      guestUsername: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      guestPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permittedBy: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      expiredAt: {
        type: DataTypes.DATE,
        defaultValue: moment().add(1, "d").format("YYYY-MM-DD HH:mm:ss"),
      },
      isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_guests",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "guest", collate: "en_US", order: "ASC" }],
        },
      ],
    }
  );
  return Guest;
};
