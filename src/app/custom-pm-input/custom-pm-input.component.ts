import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  forwardRef,
  HostBinding,
  Input,
} from "@angular/core";
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useExisting: forwardRef(() => CustomPmInputComponent),
  multi: true,
};

@Component({
  selector: 'app-custom-pm-input',
  templateUrl: './custom-pm-input.component.html',
  styleUrls: ['./custom-pm-input.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
})
export class CustomPmInputComponent implements OnInit,ControlValueAccessor {

   // @Output() number = new EventEmitter();
   ctrl: FormControl = new FormControl();
   @Input() type;
   constructor() {}
   onChange: any = (_1) => {};
   //   control.valueChanges.subscribe(e => {
   //     control.setValue(e, {emitEvent: false});
   // });
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   onTouch: any = (_1) => {};
 
   writeValue(obj: any): void {
     this.ctrl.setValue(obj);
   }
   registerOnChange(fn: any): void {
     this.onChange = fn;
   }
 
   registerOnTouched(fn: any): void {
     this.onTouch = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
     isDisabled ? this.ctrl.disable() : this.ctrl.enable();
   }
   ngOnInit() {}
   add() {
     this.ctrl.setValue(this.ctrl.value + 1);
     // this.change('');
     this.change();
   }
   subtract() {
     this.ctrl.setValue(this.ctrl.value - 1);
     this.change();
     // this.change('');
   }
   change() {
     this.onTouch(this.ctrl.value);
     this.onChange(this.ctrl.value);
   }
}
