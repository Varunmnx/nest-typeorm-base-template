import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDto } from "../dto/create-user-request.dto";
import { UserEntity } from "../entities/user.entitiy";
import { UserService } from "../services/user.service";

@ApiTags('user')
@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post()
    @ApiResponse({description:'The record has been successfully created.',type:UserEntity })
    async createUser(@Body() createUserRequest: CreateUserRequestDto){
      return this.userService.createUser(createUserRequest)
    }
}