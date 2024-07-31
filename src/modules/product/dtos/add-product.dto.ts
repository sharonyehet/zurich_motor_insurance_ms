import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { UpdateProductRequestDto } from './update-product.dto';

export class AddProductRequestDto extends UpdateProductRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    @Length(4, 4, { message: 'Product Code should be 4 digit only' })
    productCode: string;
}
