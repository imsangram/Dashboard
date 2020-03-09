import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarpipe'
})
export class AvatarpipePipe implements PipeTransform {

  transform(value: string): string {
    const num = this.getRandomInt(12);
    return `face-${num}.png`;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
