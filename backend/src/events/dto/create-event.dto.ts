import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}
