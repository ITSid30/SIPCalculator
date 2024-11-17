import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css'
})
export class DonutChartComponent implements OnChanges {

  @Input() investment: number = 0;
  @Input() interest: number = 0;
  public chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['investment'] || changes['interest']) {  
      this.updateChart();
    }
  }

  private updateChart(): void {
    if(this.chart) {
      this.chart.data.datasets[0].data = [this.investment, this.interest];
      this.chart.update();
    } else {
      this.createChart();
    }
  }

  private createChart(): void {
    this.chart = new Chart('sipChart', {
      type: 'doughnut',

      data: {
        labels: ['Invested Amount', 'Estimated Returns'],
        // xLabels, yLabels
        datasets: [{
          label: 'SIP Breakdown',
          data: [this.investment, this.interest],
          backgroundColor: [
            'lightblue',
            'blue',
          ],
          hoverBorderColor: 'white',
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2
      }
    });
  }
}
