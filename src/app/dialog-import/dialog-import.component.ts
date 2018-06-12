import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Validators, FormBuilder} from '@angular/forms';
import {HttpService} from '../service/http.service';
import {Asset} from '../Asset';


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

  checkAsset() {
    this.httpService.getAssetsByPlatform(this.firstFormGroup.value.platformSelected).subscribe((res) => {
        console.log('success', res);
        if (res.length !== 0) {
          if (res[0].platform === this.firstFormGroup.value.platformSelected) {
            if (res[0].assets !== null && res[0].assets !== undefined && res[0].assets.length !== 0) {
              console.log('Good Assets', res[0].assets);
              this.currencies = Object.keys(res[0].assets[0]);
            } else {
              this.httpService.getKraken('Assets').subscribe(result => {
                console.log('Bad Assets', res[0].assets);
                this.currenciesAssociates = Object.keys(result);
                // TODO Update assets
              });
            }
            if (res[0].pairs !== null && res[0].pairs !== undefined && res[0].pairs.length !== 0) {
              console.log('Good Pairs', res[0].pairs);
              this.currenciesAssociates = Object.keys(res[0].pairs[0]);
            } else {
              this.httpService.getKraken('AssetPairs').subscribe(result => {
                console.log('Bad A1ssetPair', res[0].pairs);
                this.currenciesAssociates = Object.keys(result);
                // TODO Update pairs
              });
            }
          }
        } else {
          if (this.firstFormGroup.value.platformSelected === 'Kraken') {
            this.httpService.getKraken('Assets').subscribe(result => {
              this.currencies = Object.keys(result);
              this.httpService.getKraken('AssetPairs').subscribe(resu => {
                this.currenciesAssociates = Object.keys(resu);
                this.httpService.saveAsset(new Asset(this.firstFormGroup.value.platformSelected, resu, result )).subscribe( (r) => {
                  console.log(r);
                });
              });
            });
          }
        }
      }, (error) => {
        this.httpService.getKraken('Assets').subscribe(result => {
          this.currencies = Object.keys(result);
          this.httpService.getKraken('AssetPairs').subscribe(res => {
            this.currenciesAssociates = Object.keys(res);
            this.httpService.saveAsset(new Asset(this.firstFormGroup.value.platformSelected, res, result )).subscribe( (r) => {
              console.log(r);
            });
          });
        });
      }
    );
  }

  ngOnInit() {
  }

}
