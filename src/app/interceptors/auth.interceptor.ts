import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    setParams: {
      'lang': sessionStorage.getItem('lang') ?? 'es'
    }
  });
  return next(newRequest);
};
