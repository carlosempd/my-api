import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { IsDate } from "class-validator";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    text: string;

    @Column({ nullable: true })
    rating: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    creationDate: Date;

    @Column({ nullable: true })
    editDate: Date

    @ManyToOne(() => User, (user) => user.postsCreated)
    author: User

    @ManyToMany(() => User)
    @JoinTable()
    editUser: User[]
}