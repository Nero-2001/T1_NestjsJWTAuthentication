import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ^ ส่วนเราทำ 
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';  // อิมพอร์ต AuthModule จากโฟลเดอร์ 'auth'


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // ✅ กำหนดการเชื่อมต่อฐานข้อมูล
    UsersModule, // ✅ เพิ่มโมดูล Users
    AuthModule,
  ],
  //imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
