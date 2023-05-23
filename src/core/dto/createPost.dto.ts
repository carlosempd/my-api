import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../entity/user.entity";

export class CreatePostDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    author: User;
}