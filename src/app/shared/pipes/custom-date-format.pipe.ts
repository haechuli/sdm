import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'customDateFormat',
  standalone: true
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: Date | string | number, format = 'yyyy-MM-dd HH:mm:ss', locale: string = 'ko-KR'): string {
    if (!value) return '';
    return formatDate(value, format, locale);
  }
}


// <p>현재 날짜:</p>
//     <p>{{ today | customDateFormat }}</p>
//     <p>{{ today | customDateFormat:'yyyy/MM/dd' }}</p>