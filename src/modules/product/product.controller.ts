import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/constants/constants';
import { ApiOkCommonResponse } from 'src/common/decorators/api-ok-response.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { CommonSuccessResponseDto } from 'src/common/dtos/common-response.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AddProductRequestDto } from './dtos/add-product.dto';
import { ProductRequestQueryDto } from './dtos/common.dto';
import {
    GetProductRequestDto,
    GetProductResponseDto,
} from './dtos/get-product.dto';
import { UpdateProductRequestDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
    constructor(private productService: ProductService) {}

    @ApiOperation({
        description: 'Get premiums by product code & location',
    })
    @Get()
    @ApiOkCommonResponse(GetProductResponseDto)
    getProduct(
        @Query() dto: GetProductRequestDto,
    ): Promise<GetProductResponseDto> {
        return this.productService.getProductPremium(
            dto.productCode,
            dto.location,
        );
    }

    @ApiOperation({
        description: 'Add new product',
    })
    @Post()
    @Roles([Role.Admin])
    @ApiOkCommonResponse(CommonSuccessResponseDto)
    addProduct(
        @Body() dto: AddProductRequestDto,
    ): Promise<CommonSuccessResponseDto> {
        return this.productService.addProduct(dto);
    }

    @ApiOperation({
        description: 'Update product',
    })
    @Put()
    @Roles([Role.Admin])
    @ApiOkCommonResponse(CommonSuccessResponseDto)
    updateProduct(
        @Query() queryDto: ProductRequestQueryDto,
        @Body() dto: UpdateProductRequestDto,
    ) {
        return this.productService.updateProduct(queryDto.productCode, dto);
    }

    @ApiOperation({
        description: 'Delete product',
    })
    @Delete()
    @Roles([Role.Admin])
    @ApiOkCommonResponse(CommonSuccessResponseDto)
    deleteProduct(@Query() queryDto: ProductRequestQueryDto) {
        return this.productService.deleteProduct(queryDto.productCode);
    }
}
