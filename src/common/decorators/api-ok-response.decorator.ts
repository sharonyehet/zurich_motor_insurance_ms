import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponseDto } from '../dtos/common-response.dto';

export const ApiOkCommonResponse = <TModel extends Type<any>>(
    model: TModel,
) => {
    return applyDecorators(
        ApiExtraModels(CommonResponseDto, model),
        ApiOkResponse({
            schema: {
                type: 'object',
                $ref: getSchemaPath(CommonResponseDto),
                properties: {
                    result: {
                        type: 'object',
                        $ref: getSchemaPath(model),
                    },
                },
            },
        }),
    );
};
