import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    text: string;

    @Column()
    rating: number;

    @Column()
    creationDate: Date;

    @Column()
    editDate: Date

    @ManyToOne(() => User, (user) => user.postsCreated)
    author: User

    @ManyToMany(() => User)
    @JoinTable()
    editUser: User[]
}