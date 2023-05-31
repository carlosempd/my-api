import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        type: String,
        description: 'Name of the post. Required'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Text of the post. Required'
    })
    @IsString()
    @IsNotEmpty()
    text: string;

    author: User;
}