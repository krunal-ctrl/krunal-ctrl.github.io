import { Pipe, PipeTransform } from '@angular/core';
import { completedYears } from '../util/completed-years';

@Pipe({
  name: 'yearsSince',
})
export class YearsSincePipe implements PipeTransform {
  transform(iso: string): number {
    return completedYears(iso);
  }
}
