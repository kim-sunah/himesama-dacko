import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { ConnectSidMiddleware } from 'src/middleware/connect-sid.middleware';
import { Search } from 'src/search/entities/search.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Auth,Search])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConnectSidMiddleware)
      .forRoutes('*');
  }
}
