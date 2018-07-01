import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() stateMenu = new EventEmitter();
  stateLoading: string;
  isVisible = false;

  constructor() { }

  displayProgressBar(stateLoading: number) {
    if (stateLoading >= 100) {
      this.isVisible = false;
    }
    if (stateLoading === 0) {
      this.isVisible = true;
    }
    this.stateLoading = stateLoading.toFixed(2);
  }
  eventMenu(menu: number) {
    if (menu === 0) {
      this.stateMenu.emit('LIVE');
    } else if(menu === 1) {
      this.stateMenu.emit('BACKTESTING');
    } else if(menu === 2) {
      this.stateMenu.emit('IMPORT');
    } else if(menu === 3) {
      this.stateMenu.emit('CONFIG');
    } else {
    }
  }
  ngOnInit() {
    console.log('Header init');
  }

}
