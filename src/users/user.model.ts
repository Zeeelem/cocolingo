import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreateAttrs {
    email: string;
    password: string;
    repeatPassword: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreateAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    repeatPassword: string;
}
