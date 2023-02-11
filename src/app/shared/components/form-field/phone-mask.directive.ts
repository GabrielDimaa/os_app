import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneMask]'
})
export class PhoneMaskDirective {
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  public onInputChange(event: any): void {
    const initialValue = this.el.value;

    this.el.value = this.applyMask(initialValue);

    if (initialValue !== this.el.value)
      event.stopPropagation();
  }

  public applyMask(value: string): string {
    if (!value) return '';

    let newValue = value.replace(/[^0-9]*/g, '');

    if (newValue.length <= 10) {
      newValue = newValue
        .replace(/(\d{0})(\d)/, '($1$2')
        .replace(/(\d{2})(\d)/, '$1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      newValue = newValue
        .replace(/(\d{0})(\d)/, '($1$2')
        .replace(/(\d{2})(\d)/, '$1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    return newValue.slice(0, 15);
  }
}
