import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class RatePostDto {
    @ApiProperty({
        type: Number,
        description: 'ID of the post. Required'
    })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty({
        type: Number,
        description: 'Rate of the post (1-5). Required'
    })
    @IsInt()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating: number;
}