import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import {saveAs} from 'file-saver';
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
import { User, UserDto } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { ToastrService } from 'ngx-toastr';

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

  userLogin= new UserDto();
  user:User;
  listDevices: Device[] | undefined;
  count = 0;
  total = 0;
  device_available: number[];
  device_unAvailable: number[];
  user_id:number;
  pageSize = 5;
  currentDevice: Device;
  currentIndex = -1;
  page = 1;
  term = '';
  title = 'Team C-internship';
  series: ApexAxisChartSeries;
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private userService : UserService,
    private router: Router,
    private toastrService: ToastrService

  ) {
    this.user_id=this.route.snapshot.params['user_id'];

  }

  ngOnInit(): void {

    this.device_unAvailable = [];
    this.device_available = [];
    this.deviceService.getTotalDevice().subscribe(res =>{

      this.total = res.total;
      this.device_available.push( res.device_available);
      this.device_unAvailable.push(res.device_unAvailable);
      this.series = [
        {
          name: "Số thiết còn trong kho",
          data: this.device_available
        },
        {
          name: "Số thiết đã cho mượn",
          data: this.device_unAvailable
        }
      ]

       this.chartOptions = {
        series: this.series,
        chart: {
          type: "bar",
          height: 350,
          width: 500
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

    })
    this.userService.getUserLogin().subscribe(res =>{

      this.userLogin = res;
     });

    this.retrieveDevice(this.term);
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
    this.deviceService.getAllDeviceWithPagination(term).subscribe(res =>{
      console.log(res)
      this.listDevices = res.content;
      this.count = res.totalElements;
    });
    this.userService.getUserLogin().subscribe(res =>{
      console.log(res);
      this.userLogin = res;
  });
  }

  searchByTerm(){
    this.retrieveDevice(this.term);
  }

  updateDevice(id: number) {
    this.router.navigate(['update-device', id]);
  }
  viewUser(user_id: number) {
    this.router.navigate(['view-user/', user_id]);
  }

  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(data => {
    this.router.navigate(['home']);
      window.location.reload();
    });
  }

  exportExcel() {

    const data = this.deviceService.exportExcel().subscribe(
      next => {

        saveAs(next, 'Device.xlsx');
      }
    );
  }
}
