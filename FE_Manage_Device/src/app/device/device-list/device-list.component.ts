import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  listDevices: Device[] | undefined;
  count = 0;
  total = 0;
  pageSize = 5;
  currentDevice: Device;
  currentIndex = -1;
  page = 1;;
  term = '';
  constructor(
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Số thiết bị Window còn lại",
          data: [44]
        },
        {
          name: "Số thiết bị Window đã cho mượn",
          data: [76]
        },
        {
          name: "Số thiết bị Macbook còn lại",
          data: [35]
        },
        {
          name: "Số thiết bị Macbook đã cho mượn",
          data: [35]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Thiết bị"

        ]
      },
      yaxis: {
        title: {
          text: "()"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "" + val ;
          }
        }
      }
    };
  }

  ngOnInit(): void {
    // this.getAllDevice();
    this.getTotalDevice();
    this.retrieveDevice(this.term);
  }

  getTotalDevice(){
     this.deviceService.getTotalDevice().subscribe(res =>{
       this.total = res;
     })
  }

  private getAllDevice() {
    this.deviceService.getAllDevice().subscribe(data => {
      this.listDevices = data;
    });
  }
  viewDevice(id: number) {
    this.router.navigate(['view-device', id]);

  }



  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = device;
    this.currentIndex = index;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveDevice(this.term);
  }

  retrieveDevice(term?: string){
    console.log(this.term);
    this.deviceService.getAllDeviceWithPagination(term).subscribe(res =>{
      console.log(res);
      this.listDevices = res.content;
      this.count = res.totalElements;
    })
  }

  searchByTerm(){
    this.retrieveDevice(this.term);
  }

  updateDevice(id: number) {
    this.router.navigate(['update-device', id]);
  }
  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(data => {
      this.router.navigate(['list-device']);
      window.location.reload();
    })
  }
}
