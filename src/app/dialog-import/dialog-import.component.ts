import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Validators, FormBuilder} from '@angular/forms';


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
  endDateFilter = (d: Date): boolean => {
    return d >= new Date(2014, 2, 1) && d <= this.today;
  };
  startDateFilter = (d: Date): boolean => {
    return d >= new Date(2014, 1, 1) && d <= this.today;
  };

  constructor(
    public dialogRef: MatDialogRef<DialogImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.firstFormGroup = this.formBuilder.group({
      platformSelected: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      pairSelected: ['', Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      startDate: [new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate()), Validators.required],
      endDate: [this.today, Validators.required]
    });
  }

  public getTimestamp(event: Date): String {
    return event.getTime().toFixed(6);
  }

  sendData(): void {
    this.dataToSend['endDate'] = this.getTimestamp(this.thirdFormGroup.value.endDate);
    this.dataToSend['startDate'] = this.getTimestamp(this.thirdFormGroup.value.startDate);
    this.dataToSend['platformSelected'] = this.firstFormGroup.value.platformSelected;

    if (this.secondFormGroup.value.pairSelected === 'BTC/USD') {
      this.dataToSend['pairSelected'] = 'XXBTZUSD';
    } else if (this.secondFormGroup.value.pairSelected === 'BTC/EUR') {
      this.dataToSend['pairSelected'] = 'XXBTZEUR';
    } else {
    }
    this.dialogRef.close(this.dataToSend);
  }

  ngOnInit() {
  }

}
