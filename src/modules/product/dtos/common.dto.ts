import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class ProductRequestQueryDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(4, 4, { message: 'Product Code should be 4 digit only' })
    @IsNumberString()
    productCode: string;
}
