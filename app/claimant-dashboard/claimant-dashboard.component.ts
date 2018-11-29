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
  selector: 'claimant-dashboard',
  templateUrl: './claimant-dashboard.component.html',
  styleUrls: ['./claimant-dashboard.component.css']
})
export class ClaimantDashboardComponent implements OnInit {

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
   
    this.getAllClaims();
  }

  

  getAllClaims() {
    this.params = new HttpParams();
    // this.http.get('http://localhost:55373/api/claims')
    this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims')  
    .subscribe(response => {
        this.claims = response;
      });

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

  getRecord(ucsr) {
    // var link = this.claims.filter(x => x.Id == "MVPXY0007689");
    
    var link = this.claims.filter(x => x.Id == ucsr);
    console.log(ucsr);
    console.log(link);
      this.http.get('/claimant-veiw'+ '?id=' + ucsr)  
      .subscribe(response => {
          this.claims = response;
        });   
  }

  

  reset(event) {
    this.cob = '';
    this.status = '';
  }
}
