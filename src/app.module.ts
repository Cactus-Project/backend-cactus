import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs'
import { UserModule } from './modules/users/user.module';
import { configOrm } from './config/ormConfig';
import * as path from 'path';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
  
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:true,
      extra:{
          ssl:{
          rejectUnauthorized:false
          }
      },
  
      entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
      autoLoadEntities: true,
  
      synchronize: true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
