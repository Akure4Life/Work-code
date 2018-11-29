import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'carrier-dashboard',
  templateUrl: './carrier-dashboard.component.html',
  styleUrls: ['./carrier-dashboard.component.css']
})
export class CarrierDashboardComponent implements OnInit {

  statusControl: FormControl = new FormControl();
  COBControl: FormControl = new FormControl();
  claims: any;
  fromDate: string;
  toDate: string;
  status: string;
  cob: string;
  params: HttpParams;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.statusOptions = this.statusControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filterStatus(val.toString()))
    );

    this.cobOptions = this.COBControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filterCOB(val.toString()))
    );

    this.openDatePicker();
    this.getAllClaims();
  }

  statuses = [
    'All',
    'Submitted',
    'With Broker',
    'With Carrier',
    'Approved',
  ]

  cobs = [
    'All',
    'Property'
  ]

  statusOptions: Observable<string[]>;
  cobOptions: Observable<string[]>;

  filterStatus(val: string): string[] {
    return this.statuses.filter(status =>
      status.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterCOB(val: string): string[] {
    return this.cobs.filter(cob =>
      cob.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  openDatePicker() {
    $('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
      }
  });
  }

  getAllClaims() {
    this.params = new HttpParams();
    // this.http.get('http://localhost:55373/api/claims')
    this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims')  
    .subscribe(response => {
        this.claims = response;
      });

  }

  filterResults(form): void {
    
    if (this.status != undefined) {
      this.params = this.params.set('Statuses', this.status); 
    }

    if (this.cob != undefined) {
      this.params = this.params.set('ClassesOfBusiness', this.cob); 
    }

    if (this.fromDate != undefined && this.fromDate != "") {
      this.params = this.params.set('ClaimantSubmissionDateTimeUTCFromInclusive', this.formatStringDate(this.fromDate));
    }
    else {
      this.params = this.params.delete("ClaimantSubmissionDateTimeUTCFromInclusive");
    }
    
    if (this.toDate != undefined && this.toDate != "") {

      let year = parseInt(this.toDate.split('/')[2]);
      let month = (parseInt(this.toDate.split('/')[1]))-1;
      let day = parseInt(this.toDate.split('/')[0]);

      let toDateFilter = new Date(year, month, day);
      toDateFilter.setDate(toDateFilter.getDate() + 1);

      this.params = this.params.set('ClaimantSubmissionDateTimeUTCToExclusive', this.formatDate(toDateFilter));
    }
    else {
      this.params = this.params.delete("ClaimantSubmissionDateTimeUTCToExclusive");
    }

    // this.http.get('http://localhost:55373/api/claims', {params: this.params})
    this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims', {params: this.params})  
    .subscribe(response => {
        this.claims = response;
      });
      
      // this.cob = '';
      // this.status = '';
  }

  formatDate(date: Date): string {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }

  formatStringDate(date: string): string {
   
    return date.split('/')[2] + "-" + date.split('/')[1] + "-" + date.split('/')[0];
  }
 
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  clearDate() {
    $('#ClaimantSubmissionDateTimeUTCFromInclusive, #ClaimantSubmissionDateTimeUTCToExclusive').clear();
  }

  statusSelected(event) {
    if (event.option.value.replace(/\s/g,'') != "" &&  event.option.value.replace(/\s/g,'') != undefined) {
      this.status = event.option.value.replace(/\s/g,'');
    }
    
  }

  cobSelected(event) {
    if (event.option.value != "" && event.option.value != undefined) {
      this.cob = event.option.value;
    }

  }

  reset(event) {
    this.cob = '';
    this.status = '';
  }
}