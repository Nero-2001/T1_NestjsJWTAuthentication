import { Injectable, ConflictException } from '@nestjs/common';  // import ConflictException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';  // import bcrypt
import { User } from '../typeorm/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }
  

  async createUser(userData: { username: string; password: string }): Promise<User> {
    // ตรวจสอบว่ามี username นี้ในฐานข้อมูลหรือไม่
    const existingUser = await this.usersRepository.findOne({ where: { username: userData.username } });
  
    if (existingUser) {
      // ถ้ามี username ซ้ำ ให้โยน ConflictException
      throw new ConflictException('Username already exists');
    }
  
    // ถ้าไม่ซ้ำให้สร้างผู้ใช้ใหม่
    const newUser = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);
    console.log('Created user:', savedUser);  // ตรวจสอบว่า id ถูกตั้งค่าในฐานข้อมูล
        
    console.log('Created user:', savedUser);  // เพิ่ม log เพื่อตรวจสอบว่า id ถูกบันทึกไว้ในฐานข้อมูลหรือไม่
    return savedUser;
  }
  
}
