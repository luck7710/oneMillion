import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/chart').subscribe(data => {
      this.chart = data;
    });
  }

}
