import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogImportComponent} from '../dialog-import/dialog-import.component';
import {HttpService} from '../service/http.service';
import {Asset} from '../Asset';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-dialog-strategy',
  templateUrl: './dialog-strategy.component.html',
  styleUrls: ['./dialog-strategy.component.css']
})
export class DialogStrategyComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  dataToSend = [];

  constructor(
    public httpService: HttpService,
    public dialogRef: MatDialogRef<DialogImportComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder) {
    console.log(data);
    this.firstFormGroup = this.formBuilder.group({
      indicatorSelected: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({});
    this.thirdFormGroup = this.formBuilder.group({
      tableSelected: ['', Validators.required],
    });
  }

  updateData(tableSelected) {
    this.thirdFormGroup.get('tableSelected').setValue(tableSelected[0].chart);
  }

  sendData(): void {
    this.dataToSend['indicatorSelected'] = this.firstFormGroup.value.indicatorSelected;
    this.dataToSend['tableSelected'] = this.thirdFormGroup.value.tableSelected;
    this.dialogRef.close(this.dataToSend);
  }

  ngOnInit() {
    this.tableComponent.tableDisplay(this.data['table']);
  }

}
