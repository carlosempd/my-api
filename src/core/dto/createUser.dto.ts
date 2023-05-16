import { 
    IsEmail, 
    IsInt, 
    IsNotEmpty,
    IsString, 
    Max,
    Min } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    roleId: number;
}