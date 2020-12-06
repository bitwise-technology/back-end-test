import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { USER_GENDER } from './user-gender.enum.model';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'username',
    unique: true,
    length: 30,
    nullable: false
  })
  username: string;

  @Column({
    name: 'name',
    nullable: false,
    length: 30
  })
  name: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
    length: 30
  })
  lastName: string;

  @Column({
    name: 'profile_image_url',
    nullable: true,
    default: null
  })
  profileImageUrl?: string;

  @Column({
    name: 'bio',
    nullable: true,
    type: 'varchar',
    length: 30
  })
  bio?: string;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  githubLogin?: string;

  @Column({ enum: USER_GENDER, default: USER_GENDER.NOT_SPECIFIED })
  gender: USER_GENDER;
}
