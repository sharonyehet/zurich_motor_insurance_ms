import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkCommonResponse } from 'src/common/decorators/api-ok-response.decorator';
import { CommonSuccessResponseDto } from 'src/common/dtos/common-response.dto';
import { AddProductRequestDto } from './dtos/add-product.dto';
import { ProductRequestQueryDto } from './dtos/common.dto';
import {
    GetProductRequestDto,
    GetProductResponseDto,
} from './dtos/get-product.dto';
import {
    UpdateProductRequestDto,
    UpdateProductResponseDto,
} from './dtos/update-product.dto';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
    @ApiOperation({
        description: 'Get premiums by product code & location',
    })
    @Get()
    @ApiOkCommonResponse(GetProductResponseDto)
    getProduct(@Query() dto: GetProductRequestDto) {
        console.log(dto);
    }

    @ApiOperation({
        description: 'Add new product',
    })
    @Post()
    @ApiOkCommonResponse(CommonSuccessResponseDto)
    addProduct(@Body() dto: AddProductRequestDto) {
        console.log(dto);
    }

    @ApiOperation({
        description: 'Update product',
    })
    @Put()
    @ApiOkCommonResponse(UpdateProductResponseDto)
    updateProduct(
        @Query() queryDto: ProductRequestQueryDto,
        @Body() dto: UpdateProductRequestDto,
    ) {
        console.log(queryDto, dto);
    }

    @ApiOperation({
        description: 'Delete product',
    })
    @Delete()
    @ApiOkCommonResponse(CommonSuccessResponseDto)
    deleteProduct(@Query() queryDto: ProductRequestQueryDto) {
        console.log(queryDto);
    }
}
