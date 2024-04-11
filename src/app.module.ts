import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './common/logger/logger.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV } from './env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroserviceEnvVariables } from './microserviceFactory.factory';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ENV.envFileName()
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(configService:ConfigService)=>({
        // type:new MicroserviceEnvVariables(configService).TYPE,
        host: new MicroserviceEnvVariables(configService).HOST,
        database: new MicroserviceEnvVariables(configService).DATABASE_NAME,
        port: new MicroserviceEnvVariables(configService).DB_PORT,
        username: new MicroserviceEnvVariables(configService).DB_USER_NAME,
        password: new MicroserviceEnvVariables(configService).DB_PASSWORD,
        synchronize: true, 
        autoLoadEntities: true,

      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService,LoggerService],
})
export class AppModule {}
