import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'Email of the user. Required'
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: String,
        description: 'Password of the user. Required'
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}