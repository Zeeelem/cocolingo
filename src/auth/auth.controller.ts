import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserCreateDto } from "src/users/dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    // Регистрация аккаунта
    @Post("/registration")
    registration(@Body() dto: UserCreateDto) {
        return this.authService.registration(dto);
    }
    // Вход в аккаунт
    @Post("/login")
    login(@Body() dto: UserCreateDto) {
        return this.authService.login(dto);
    }
}
