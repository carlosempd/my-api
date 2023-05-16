import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from './core/config/jwt.config';

@Module({
  imports: [
    AuthModule, 
    PostsModule, 
    UsersModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env',
      load: [jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_TYPE,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/**/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        autoLoadEntities: true,
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
