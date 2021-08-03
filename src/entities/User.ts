import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  profileImageUrl: string;

  @Column()
  bio: string;

  @Column()
  email: string;

  @Column()
  gender: string;
}

export default User;
