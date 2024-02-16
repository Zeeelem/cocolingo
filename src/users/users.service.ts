import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UserCreateDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    // Создать User
    async createUser(dto: UserCreateDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    // Найти Users
    async getAllUser() {
        const users = await this.userRepository.findAll();
        return users;
    }

    // Найти User по email
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }
}
