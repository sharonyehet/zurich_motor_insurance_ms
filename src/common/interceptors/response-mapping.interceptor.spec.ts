import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
    CommonResponseDto,
    CommonSuccessResponseDto,
} from '../dtos/common-response.dto';
import { ResponseMappingInterceptor } from './response-mapping.interceptor';

describe('ResponseMappingInterceptor', () => {
    let interceptor: ResponseMappingInterceptor<any>;

    const context = {} as ExecutionContext;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ResponseMappingInterceptor],
        }).compile();

        interceptor = module.get<ResponseMappingInterceptor<any>>(
            ResponseMappingInterceptor,
        );
    });

    it('should be defined', () => {
        expect(interceptor).toBeDefined();
    });

    it('should transform the response into CommonResponseDto', (done) => {
        const mockValue: CommonSuccessResponseDto = { success: true };
        const mockResponse = new CommonResponseDto<CommonSuccessResponseDto>();
        mockResponse.result = mockValue;

        const callHandler = {
            handle: () => of(mockValue),
        } as CallHandler;

        interceptor.intercept(context, callHandler).subscribe((result) => {
            expect(result).toBeInstanceOf(CommonResponseDto);
            expect(result.result).toEqual(mockValue);
            done();
        });
    });

    it('should handle null response', (done) => {
        const mockResponse = new CommonResponseDto<null>();
        mockResponse.result = null;

        const callHandler = {
            handle: () => of(null),
        } as CallHandler;

        interceptor.intercept(context, callHandler).subscribe((result) => {
            expect(result).toBeInstanceOf(CommonResponseDto);
            expect(result.result).toBeNull();
            done();
        });
    });
});
