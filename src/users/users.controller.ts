import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {}

    // Создать User
    @Post()
    createUser(@Body() dto: UserCreateDto) {
        return this.userService.createUser(dto);
    }

    // Найти Users
    @Get()
    getAllUser() {
        return this.userService.getAllUser();
    }
}
