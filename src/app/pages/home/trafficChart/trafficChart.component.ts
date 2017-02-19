import {Component} from '@angular/core';
import {TrafficChartService} from './trafficChart.service';
import * as Chart from 'chart.js';

import 'style-loader!./trafficChart.scss';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html'
})

// TODO: move chart.js to it's own component
export class TrafficChart {

  private errorMessage;
  public doughnutData: Array<Object>;

  constructor(private trafficChartService:TrafficChartService) {
    trafficChartService.getData().then(
      res => {
        this.doughnutData = res;
        console.log(res);
        this._loadDoughnutCharts();
    },
    error =>  this.errorMessage = <any>error);
  }

  ngAfterViewInit() {

  }

  private _loadDoughnutCharts() {
    let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
  }
}
