import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class RatePostDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating: number;
}