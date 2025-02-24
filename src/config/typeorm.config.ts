import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost', 
  port: 3306, 
  username: 'testuser', 
  password: 'testuser123', 
  database: 'mynestjs_mysql_tutorial', 
  entities: [User], 
  synchronize: true, 
};
