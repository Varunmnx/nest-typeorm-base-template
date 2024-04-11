import { ExceptionFilter, INestApplication, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class MicroServiceEnvKeys {
  public static readonly APP_NAME = 'APP_NAME';
  public static readonly APP_PORT = 'APP_PORT';
  public static readonly APP_VERSION = 'APP_VERSION';
  public static readonly NODE_ENV = 'NODE_ENV';
  public static readonly DB_PORT = 'DB_PORT';
  public static readonly DB_USER_NAME = 'DB_USER_NAME';
  public static readonly DB_PASSWORD = 'DB_PASSWORD';
  public static readonly DATABASE_NAME = 'DATABASE_NAME';
  public static readonly HOST = 'HOST';
  public static readonly TYPE = 'TYPE'

}

export class MicroserviceEnvVariables {
  public readonly APP_NAME: string;
  public readonly APP_PORT: string;
  public readonly APP_VERSION: string;
  public readonly NODE_ENV: string;
  // database env
  public readonly DB_PORT: number;
  public readonly DB_USER_NAME: string;
  public readonly DB_PASSWORD: string;
  public readonly DATABASE_NAME: string;
  public readonly HOST: string;
  public readonly TYPE:string

  //service name
  public readonly SERVICE_NAME = 'test-service';
  constructor(configService: ConfigService) {
    this.APP_NAME = configService.get(MicroServiceEnvKeys.APP_NAME);
    this.APP_PORT = configService.get(MicroServiceEnvKeys.APP_PORT);
    this.APP_VERSION = configService.get(MicroServiceEnvKeys.APP_VERSION);
    this.NODE_ENV = configService.get(MicroServiceEnvKeys.NODE_ENV);
    // database env 
    this.DB_PORT = configService.get(MicroServiceEnvKeys.DB_PORT)
    this.DB_USER_NAME = configService.get(MicroServiceEnvKeys.DB_USER_NAME)
    this.DB_PASSWORD = configService.get(MicroServiceEnvKeys.DB_PASSWORD)
    this.DATABASE_NAME = configService.get(MicroServiceEnvKeys.DATABASE_NAME)
    this.HOST = configService.get(MicroServiceEnvKeys.HOST)
    this.TYPE = configService.get(MicroServiceEnvKeys.TYPE)
  }
}

export class MicroserviceFactory {
  private static _loggerService: LoggerService;
  private static _app: INestApplication;
  private static _envVariables: MicroserviceEnvVariables;

  public static get app(): INestApplication {
    return MicroserviceFactory._app;
  }
  public static get envVariables(): MicroserviceEnvVariables {
    return MicroserviceFactory._envVariables;
  }

  // static get<T = any>(t: Type<T> | string): T {
  //   return MicroserviceFactory._app.get(t);
  // }

 
  public static get loggerService(): LoggerService {
    return MicroserviceFactory._loggerService;
  }

  static async addGlobalFilters(filter: ExceptionFilter) {
    MicroserviceFactory._app.useGlobalFilters(filter);
  }

  static async enableCors() {
    MicroserviceFactory._app.enableCors({
      origin: ['*'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
  }

  static async addProcessTitle() {
    process.title = MicroserviceFactory._envVariables.SERVICE_NAME;

    process.on('uncaughtException', function (e) {
      MicroserviceFactory._loggerService.error('MAIN uncaughtException', JSON.stringify(e));
    });

    process.on('UnhandledPromiseRejectionWarning', function (e) {
      MicroserviceFactory._loggerService.error('MAIN UnhandledPromiseRejectionWarning', e);
    });
  }

  static async setGlobalPrefix(prefix: string) {
    MicroserviceFactory._app.setGlobalPrefix(prefix);
  }

  static async create(): Promise<INestApplication> {
    MicroserviceFactory._app = await NestFactory.create(AppModule);
    MicroserviceFactory._envVariables = new MicroserviceEnvVariables(
      MicroserviceFactory._app.get(ConfigService),
    );
    MicroserviceFactory._loggerService =
      MicroserviceFactory._app.get(LoggerService);
    return MicroserviceFactory._app;
  }

  static listen() {
    const port = MicroserviceFactory._envVariables.APP_PORT;
    const config = new DocumentBuilder()
    .setTitle('Nest Base Template')
    .setDescription('The Nest Base Template API description')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`,'local environment')
    .addTag('Nest Base Template')
    .build();
    const document = SwaggerModule.createDocument(MicroserviceFactory._app, config);
    SwaggerModule.setup('api/v3/docs', MicroserviceFactory._app, document);
    MicroserviceFactory._app.listen(port, () => {
      MicroserviceFactory._loggerService.log('MAIN', `Microservice is listening on ${port}`);
    })

  }
}

