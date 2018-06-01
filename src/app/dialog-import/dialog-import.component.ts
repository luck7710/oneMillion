import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Validators, FormBuilder} from '@angular/forms';
import {HttpService} from '../service/http.service';


@Component({
  selector: 'app-dialog-import',
  templateUrl: './dialog-import.component.html',
  styleUrls: ['./dialog-import.component.css']
})
export class DialogImportComponent implements OnInit {
  dataToSend = [];
  firstFormGroup;
  secondFormGroup;
  thirdFormGroup;
  today = new Date();
  currencies = [];
  currenciesAssociates = [];
  pairs = [];
  pairSelected: string;
  PlaceholderDynamic = 'Choice first base asset';
  endDateFilter = (d: Date): boolean => {
    return d >= new Date(2014, 2, 1) && d <= this.today;
  }
  startDateFilter = (d: Date): boolean => {
    return d >= new Date(2014, 1, 1) && d <= this.today;
  }
  constructor(
    public httpService: HttpService,
    public dialogRef: MatDialogRef<DialogImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.firstFormGroup = this.formBuilder.group({
      platformSelected: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      currencyNumerator: ['', Validators.required],
      pairSelected: [{value: '', disabled: true}, Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      startDate: [new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate()), Validators.required],
      endDate: [this.today, Validators.required]
    });
    httpService.getKraken('Assets').subscribe(result => {
      this.currencies = Object.keys(result);
    });
    httpService.getKraken('AssetPairs').subscribe(result => {
      this.currenciesAssociates = Object.keys(result);
    });
  }

  public getTimestamp(event: Date): String {
    return event.getTime().toFixed(6);
  }

  switchDisabledSelect(isDisabled: boolean, currency: any) {
    if (!isDisabled) {
      this.secondFormGroup.get('pairSelected').reset();
      this.secondFormGroup.get('pairSelected').enable();
      this.PlaceholderDynamic = 'Pair';
      this.searchAltToCurrency(currency);

    } else {
      this.secondFormGroup.get('pairSelected').disabled();
      this.PlaceholderDynamic = 'Choice first base asset';

    }
  }

  searchAltToCurrency(currency: string) {
    this.pairs = this.currenciesAssociates.filter(x => x.includes(currency));
  }
  sendData(): void {
    this.dataToSend['endDate'] = this.getTimestamp(this.thirdFormGroup.value.endDate);
    this.dataToSend['startDate'] = this.getTimestamp(this.thirdFormGroup.value.startDate);
    this.dataToSend['platformSelected'] = this.firstFormGroup.value.platformSelected;
    this.dataToSend['pairSelected'] = this.secondFormGroup.value.pairSelected;
    this.dialogRef.close(this.dataToSend);
  }

  ngOnInit() {
  }

}
