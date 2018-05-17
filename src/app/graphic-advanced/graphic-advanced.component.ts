import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graphic-advanced',
  templateUrl: './graphic-advanced.component.html',
  styleUrls: ['./graphic-advanced.component.css']
})
export class GraphicAdvancedComponent implements OnInit {
@Input() tableSelected;
  constructor() { }

  test(test) {
    console.log(test);
  }
  ngOnInit() {
  }

}
