import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {HeaderComponent} from '../header/header.component';
import {BodyComponent} from '../body/body.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  @ViewChild(BodyComponent) bodyComponent: BodyComponent;
  tableSelected: any;

  constructor() {
    console.log('Main instatiation');
  }

  ngOnInit() {
    console.log('Main init');
  }

}
