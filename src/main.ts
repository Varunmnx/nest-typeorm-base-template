import { AllExceptionsFilter } from './common/filters/exceptions.filter';
import { MicroserviceFactory } from './microserviceFactory.factory';

async function bootstrap() {
   await MicroserviceFactory.create();
   await MicroserviceFactory.enableCors()
   await MicroserviceFactory.setGlobalPrefix('/api/v3/');
   await MicroserviceFactory.addProcessTitle()
   await MicroserviceFactory.addGlobalFilters(
      new AllExceptionsFilter(MicroserviceFactory.loggerService),
    );
   await MicroserviceFactory.listen();

}
bootstrap();
