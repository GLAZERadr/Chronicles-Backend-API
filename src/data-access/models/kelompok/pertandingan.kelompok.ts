import { Model, DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";
import { Kelompok } from "./kelompok";

interface PertandinganAttributes {
    id: string,
    kode_kelompok_ganjil: string,
    kode_kelompok_genap: string,
}

export interface PertandinganInput extends PertandinganAttributes {};
export interface PertandinganOutput extends Model<PertandinganAttributes>, PertandinganAttributes {};

export class Pertandingan extends Model<PertandinganAttributes, PertandinganInput> implements PertandinganAttributes {
    public id!: string;
    public kode_kelompok_ganjil!: string;
    public kode_kelompok_genap!: string;
}

Pertandingan.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        kode_kelompok_ganjil: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Kelompok,
                key: 'kode_kelompok',
            }
        },
        kode_kelompok_genap: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Kelompok,
                key: 'kode_kelompok',
            }
        },
    },
    {
        tableName: 'pertandingan',
        timestamps: true,
        sequelize: sequalize,
    },
);

Pertandingan.belongsTo(Kelompok, { foreignKey: 'kode_kelompok_ganjil', as: 'kelompokGanjil' });
Pertandingan.belongsTo(Kelompok, { foreignKey: 'kode_kelompok_genap', as: 'kelompokGenap' });

sequalize.sync({ force: false })
    .then(() => console.log('Pertandingan table created!!'))
    .catch((error: Error) => console.log('Error creating table pertandingan: ', error));