import { IsString } from "class-validator";

export class UpdatePostDto {
    @IsString()
    name: string;

    @IsString()
    text: string;
}