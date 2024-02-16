import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserCreateDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/user.model";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    // Вход в аккаунт
    async login(dto: UserCreateDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    // Проверка при входе
    private async validateUser(dto: UserCreateDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new HttpException(
                "Пользователь не нашелся",
                HttpStatus.BAD_REQUEST
            );
        }
        const passwordEquals = await bcrypt.compare(
            dto.password,
            user.password
        );
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: "Некоректный email или пароль",
        });
    }

    // Регистрация аккаунта
    async registration(dto: UserCreateDto) {
        if (dto.password !== dto.repeatPassword) {
            throw new HttpException(
                "Пароль не совпадает.",
                HttpStatus.BAD_REQUEST
            );
        }

        const candidate = await this.userService.getUserByEmail(dto.email);

        if (candidate) {
            throw new HttpException(
                "Пользователь с таким email существуетa",
                HttpStatus.BAD_REQUEST
            );
        }

        // Хеширования пароля
        const hashPassword = await bcrypt.hash(dto.password, 6);
        const user = await this.userService.createUser({
            ...dto,
            password: hashPassword,
        });
        return this.generateToken(user);
    }

    // Генерировать Токен пользователя
    async generateToken(user: User) {
        const payLoad = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payLoad),
        };
    }
}
