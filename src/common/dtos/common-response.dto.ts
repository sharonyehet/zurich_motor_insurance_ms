import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto<T> {
    @ApiProperty()
    result: T;
}

export class CommonSuccessResponseDto {
    @ApiProperty()
    success: boolean;
}
