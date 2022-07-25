module.exports = (sequelize, DataTypes) => {
  const Thesis = sequelize.define(
    "Thesis",
    {
      _thesisId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abstract: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yearLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      section: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      yearPublished: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      authors: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      panelists: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grades: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adviser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chairperson: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dean: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abstract: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      journal_filepath: {
        type: DataTypes.STRING,
      },
      softcopy_filepath: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "tbl_thesis",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "thesis", collate: "en_US", order: "ASC" }],
        },
      ],
    }
  );
  return Thesis;
};
