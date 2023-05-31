import { ApiProperty } from "@nestjs/swagger";
import { 
    IsEmail, 
    IsInt, 
    IsNotEmpty,
    IsString, 
    Max,
    Min } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'Email of the user. Required'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Password of the user. Required'
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        description: 'Name of the user. Required'
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Lastname of the user. Required'
    })
    @IsString()
    lastname: string;

    @ApiProperty({
        type: String,
        description: 'Role id to be assigned to the user. Required'
    })
    roleId: number;
}