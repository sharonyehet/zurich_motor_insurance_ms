import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class ProductRequestQueryDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(4)
    @IsNumberString()
    productCode: string;
}
