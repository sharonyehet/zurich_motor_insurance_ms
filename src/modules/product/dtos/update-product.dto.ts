import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    price: number;
}

export class UpdateProductResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    productCode: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    price: number;
}
