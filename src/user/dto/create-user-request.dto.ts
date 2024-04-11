import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequestDto {
    @ApiProperty({type:String,description:"username"})
    @IsString()
    @IsNotEmpty()
    username:string
}