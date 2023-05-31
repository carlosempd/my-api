import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({
        type: String,
        description: 'Name of the post. Optional'
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Text of the post. Optional'
    })
    @IsString()
    text: string;
}