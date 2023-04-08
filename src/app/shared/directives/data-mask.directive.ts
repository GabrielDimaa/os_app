import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[dataMask]'
})
export class DataMaskDirective {
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.el.value;

    this.el.value = this.applyMask(initialValue);

    if (initialValue !== this.el.value) {
      event.stopPropagation();
    }
  }

  public applyMask(value: string): string {
    if (!value) return '';

    let newValue = value.replace(/\D/g, '');
    let formattedValue = '';

    for (let i = 0; i < newValue.length; i++) {
      if (i === 2 || i === 4) {
        formattedValue += '/';
      }
      formattedValue += newValue[i];
    }

    return formattedValue.slice(0, 10);
  }
}
