 
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserRequestDto } from "../dto/create-user-request.dto";
import { UserEntity } from "../entities/user.entitiy";
import { handleException } from "@/common/exceptions/http_exception_thrower";


@Injectable()
export class UserService {
    constructor( private userRepository:UserRepository) {}

    async createUser(req:CreateUserRequestDto):Promise<UserEntity>{
        try {
            let user = UserEntity.builder()
            if(req.username) 
                user.setUserName(req.username) 
            const  userEntity = user.build()
            return this.userRepository.save(userEntity)
        } catch (error) {
             handleException(error)
        }
       
    }
}