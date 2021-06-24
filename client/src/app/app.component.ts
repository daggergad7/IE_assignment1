import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

import io from 'socket.io-client';

const socket = io('http://localhost:3000');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  postId;

  constructor(private http: HttpClient) { }

  uploadFile(event) { //handels the upload of json data
    if (event.target.files.length !== 1) {
      console.error('No file selected');
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        console.log(reader.result.toString());
        let xy =reader.result.toString();
        let xz =JSON.parse(xy);
        console.log("Loaded Data:");
        console.log(xy);
        this.http.post<any>('http://localhost:3000/data', xz).subscribe(data => {
          this.postId = data.id;
      })
        // handle data processing
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  title = 'Thermometer records';
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;

  data1 = [];

  ngOnInit() {

    socket.on('data1', (res) => {
      this.updateChartData(this.chart, res, 0);
    })
    socket.on('data2', (res) => {
      this.updateChartData(this.chart, res, 1);
    })


    this.chart = new Chart('bar', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Thermometer records'
        },
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            type: 'line',
            label: 'Thermometer 1',
            data: [0],
            backgroundColor: 'rgba(255,188,0,0.4)',
            borderColor: 'rgba(255,188,0,0.4)',
            fill: false,
          },
          {
            type: 'line',
            label: 'Thermometer 2',
            data: [0],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          }
        ]
      }
    });

    let options = {
      // aspectRatio: 1,
      // legend: false,
      tooltips: false,

      elements: {
        point: {
          borderWidth: function (context) {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },
          hoverBackgroundColor: 'transparent',
          hoverBorderColor: function (context) {
            return "red";
          },
          hoverBorderWidth: function (context) {
            var value = context.dataset.data[context.dataIndex];
            return Math.round(8 * value.v / 1000);
          },
          radius: function (context) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 1000;
            return (size / 24) * base;
          }
        }
      }
    };

    
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

updateChartData(chart, data, dataSetIndex){
  chart.data.datasets[dataSetIndex].data = data;
  chart.update();
}

}
