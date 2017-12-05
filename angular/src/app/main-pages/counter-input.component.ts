import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'counter-input',
  template: `
    <button (click)="decrement()">-</button>
    {{ counterValue }}
    <button (click)="increment()">+</button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    }
  ]
})
export class CounterInputComponent implements ControlValueAccessor {
  @Input() _counterValue = 0;

  public get counterValue() {
    return this._counterValue;
  }

  public set counterValue(val: any) {
    this._counterValue = val;
    this.propagateChange(this._counterValue);
  }

  public increment() {
    this.counterValue++;
  }

  public decrement() {
    this.counterValue--;
  }

  // ControlValueAccessor interface
  public writeValue(value: any) {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}

  public setDisabledState(isDisabled: boolean) {}

  private propagateChange = (_: any) => {};
}
