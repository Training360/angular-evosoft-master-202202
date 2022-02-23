import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

const fibonacci = (num: number): number => {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Pipe({
  name: 'fibonacci'
})
export class FibonacciPipe implements PipeTransform {

  @memo()
  transform(value: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      return value;
    }

    return fibonacci(value);
  }

}
