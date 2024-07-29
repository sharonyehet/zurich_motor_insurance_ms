import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommonResponseDto } from '../dtos/common-response.dto';

@Injectable()
export class ResponseMappingInterceptor<T>
    implements NestInterceptor<T, CommonResponseDto<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<CommonResponseDto<T>> {
        return next.handle().pipe(
            map((value) => {
                const res = new CommonResponseDto<T>();
                res.result = value ?? null;
                return res;
            }),
        );
    }
}
