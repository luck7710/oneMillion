import {Component, OnInit} from '@angular/core';
import {Indicator} from '../Indicator/Indicator';

@Component({
  selector: 'app-strategie',
  templateUrl: './strategie.component.html',
  styleUrls: ['./strategie.component.css']
})
export class StrategieComponent implements OnInit {
   name: string;
   indicator: Indicator;

  constructor(name: string, indicator: Indicator) {
    this.name = name;
    this.indicator = indicator;
  }
  ngOnInit() {
  }

}
