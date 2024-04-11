import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entitiy";
import { UserService } from "./services/user.service";
import { LoggerService } from "@/common/logger/logger.service";
import { UserController } from "./controllers/user.conrtoller";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "./repositories/user.repository";


@Module({
    imports:[HttpModule,TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [LoggerService,UserService,UserRepository,ConfigService],
    exports:[UserService,UserRepository]
})

export class UserModule {}