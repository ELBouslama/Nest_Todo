import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('In first interceptor');
    const response = context.switchToHttp().getResponse();
    const dateIn = Date.now();
    console.log('created in ', dateIn);
    return next.handle().pipe(
      tap( 
      () => {
      const dateOut = Date.now() ; 
      console.log(response.Body) ;
      console.log("request end at :", dateOut);
      console.log(`Request duration : ${dateOut- dateIn} ms`);
    }
      
      )
      );
  }
}
