import { Options } from '@angular-slider/ngx-slider';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnChanges {
  title = 'SIPCalculator';
  public totalInvestAmt: number = 36000;
  public totalInterest: number = 6130;
  public totalAmount: number = 42130;

  constructor(private fb: FormBuilder) {}

  public sipForm!: FormGroup;
  public options: Options = {
    floor: 0,
    ceil: 100000,
  };
  public timePeriodOptions: Options = {
    floor: 0,
    ceil: 100,
  };
  public returnsOptions: Options = {
    floor: 0,
    ceil: 60,
  };
  value = 100;

  ngOnInit(): void {
      // code initialization
      this.sipForm = this.fb.group({
        monthlyAmount: [1000],
        timePeriod: [3],
        returns: [10],
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
      // if(changes['monthlyamount'] || changes['timePeriod'] || changes['returns']) {
        // this.calculateAmount();
      // }
  }

  onSliderChange(value: number, formControlName: string): void {
    this.sipForm.controls[formControlName].setValue(value);
    this.calculateAmount();
  }

  public calculateAmount(): void {
    // sip calculator function
    let formData = this.sipForm.getRawValue();
    let returns = formData.returns / 1200;
    this.totalInvestAmt = formData.monthlyAmount * formData.timePeriod * 12;
    this.totalAmount = formData.monthlyAmount * ((Math.pow(1 + returns, formData.timePeriod * 12) -1) / returns) * (1 + returns);
    
    this.totalInterest = this.totalAmount - this.totalInvestAmt;
    
  }

}
