import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Posts } from "./post.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @ManyToOne(() => Role, rol => rol.users)
    role: Role;

    @OneToMany(() => Posts, (post) => post.author)
    postsCreated: Posts[];
}