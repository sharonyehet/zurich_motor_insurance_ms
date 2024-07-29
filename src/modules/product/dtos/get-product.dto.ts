import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductRequestQueryDto } from './common.dto';

export class GetProductRequestDto extends ProductRequestQueryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;
}

export class GetProductResponseDto {
    @ApiProperty()
    premium: number;
}
