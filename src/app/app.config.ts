import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient ,withInterceptors} from '@angular/common/http';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { jwtInterceptor } from './core/interceptor/auth.interceptor';
import { loggingInterceptor } from './core/interceptor/logging.interceptor';
import { routes } from './app.routes';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeKo from '@angular/common/locales/ko';

registerLocaleData(localeKo);  // 다국어 지원을 위해 한국어 로케일 등록

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideHttpClient(withInterceptors([jwtInterceptor,errorInterceptor,loggingInterceptor])),
              { provide: LOCALE_ID, useValue: 'ko' }
            ]
};
