import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    username: string

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text', nullable: true })
    last_name: string

    @Column({ type: 'text', nullable: true })
    profile_image_url: string

    @Column({ type: 'text', nullable: true })
    bio: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text', nullable: true })
    gender: string

    @Column({ type: 'integer', nullable: true })
    followers: number

    @Column({ type: 'integer', nullable: true })
    following: number

    @Column({ type: 'integer', nullable: true })
    public_repos: number

    @Column({ type: 'text', nullable: true })
    public_url_user: string
}