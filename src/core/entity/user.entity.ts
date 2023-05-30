import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Posts } from "./post.entity";
import { Permission } from "./permission.entity";


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

    @ManyToMany(() => Permission, permission => permission.users)
    @JoinTable()
    permission: Permission[]

    @OneToMany(() => Posts, (post) => post.author)
    postsCreated: Posts[];
}