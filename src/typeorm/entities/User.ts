import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()  // ใช้ @CreateDateColumn แทน @Column
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
