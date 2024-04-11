import { BaseInterfaceRepository } from "@/common/database/entity.interface";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entitiy";
import { BaseAbstractRepository } from "@/common/database/entity.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export type UserRepositoryInterface = BaseInterfaceRepository<UserEntity>
@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity> implements UserRepositoryInterface {
    constructor(
        @InjectRepository(UserEntity)
         private readonly userEntity: Repository<UserEntity>
    ) {
        super(userEntity)
    }
    
}