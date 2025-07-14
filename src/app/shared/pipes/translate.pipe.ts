import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // 언어 변경 시 파이프가 다시 실행되도록 함
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) { }

  transform(key: string): string {
    return this.languageService.translate(key);
  }
}
