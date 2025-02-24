import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!555';
  }
}

//  @Injectable() คือ Decorator ที่บอกว่า คลาสนี้สามารถใช้เป็น Dependency ได้ (Toh)