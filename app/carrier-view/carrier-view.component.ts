import { Component, OnInit } from '@angular/core';
import { startWith } from 'rxjs/operators/startWith';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Http, Response, Headers } from '@angular/http';
import { Claim } from '../claim';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'carrier-view',
  templateUrl: './carrier-view.component.html',
  styleUrls: ['./carrier-view.component.css']
})
export class CarrierViewComponent implements OnInit {

  claim: any;
  patchClaimResponse: any;
  patchClaimRecord: any = {};
  responseStatus: number;
  responseStatusGET: number;
  InsuredName: string;
  InsuredContact: string;
  InsuredTelephone: string;
  InsuredEmail: string;
  PolicyNumber: string;
  DateOfLossFrom: string;
  DateOfLossTo: string;
  BrokerAdvisedDate: string;
  UCR: string;
  LossAddress: string;
  LossTown: string;
  LossCounty: string;
  LossPostcode: string;
  CountryOfLoss: string;
  LossDescription: string;
  ClaimAmount: number;
  BrokerContact: string;
  BrokerPhone: string;
  LossName: string;
  AmountOutstandingGBP: number;
  Status: string;
  BrokerComments: string;
  Id: string;
  SCAPIndicator: boolean;
  InsurerRef: string;
  Narrative: string;
  claimantSubmissionDateTimeUTC: string;
  DateOfLossFromDate: string;
  BrokerFirstAssignmentToCarrierDateTimeUTC: string;
  BrokerFirstViewDateTimeUTC: string;
  CarrierApprovalDateTimeUTC: string; 
  newStatus: string;
  
  
  
  constructor(private http: Http, private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      this.Id = params.id;
    });

    this.openDatePicker();
    this.getClaim();
  }

  myControl: FormControl = new FormControl();

  options = [
    'Broker',
    'Carrier',
    'Claimant'
  ];

  daysNumbers() {
    var change = this.DateOfLossFrom = this.claim.dateAndTimeOfLossFromUTC;
    var date1 = new Date(change);
    var date2 = new Date(this.claimantSubmissionDateTimeUTC);
    var date1InDays = Math.floor(date1.getTime() / (1000 * 3600 * 24));
    var date2InDays = Math.floor(date2.getTime() / (1000 * 3600 * 24));
    var diffDays = date2InDays - date1InDays; 
    return diffDays; 
  }

  daysNumbersBroker() {
    
    var date1 = (new Date(this.claimantSubmissionDateTimeUTC));
    var date2 = new Date(this.BrokerFirstViewDateTimeUTC);
    var date1InDays = Math.floor(date1.getTime() / (1000 * 3600 * 24));
    var date2InDays = Math.floor(date2.getTime() / (1000 * 3600 * 24));
    var diffDays = date2InDays - date1InDays; 
    return diffDays; 
  }

  daysNumbersCarrier() {
    var date1 = new Date(this.BrokerFirstViewDateTimeUTC);
    var date2 = new Date(this.BrokerFirstAssignmentToCarrierDateTimeUTC);
    var date1InDays = Math.floor(date1.getTime() / (1000 * 3600 * 24));
    var date2InDays = Math.floor(date2.getTime() / (1000 * 3600 * 24));
    var diffDays = date2InDays - date1InDays;
    return diffDays;
  }

  daysNumbersApproved() {
    var date1 = new Date(this.BrokerFirstAssignmentToCarrierDateTimeUTC);
    var date2 = new Date(this.CarrierApprovalDateTimeUTC);
    var date1InDays = Math.floor(date1.getTime() / (1000 * 3600 * 24));
    var date2InDays = Math.floor(date2.getTime() / (1000 * 3600 * 24));
    var diffDays = date2InDays - date1InDays;
    return diffDays; 
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

  getClaim() {
    // this.http.get('http://localhost:55373/api/claims/' + this.Id)
    this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims/' + this.Id)
    .subscribe(
      response => {
        this.claim = response.json();

        this.InsuredName = this.claim.insuredName;
        this.InsuredContact = this.claim.insuredContactName;
        this.InsuredTelephone = this.claim.insuredTelephoneNumber;
        this.InsuredEmail = this.claim.insuredEmailAddress;
        this.PolicyNumber = this.claim.policyNumber;

        if (this.claim.dateAndTimeOfLossFromUTC ==  null) {
          this.DateOfLossFrom = "";
          this.DateOfLossFromDate = "";
        }
        else {
          this.DateOfLossFrom = this.getStringDateTime(new Date(this.claim.dateAndTimeOfLossFromUTC));
          this.DateOfLossFromDate = this.getStringDate(new Date(this.claim.dateAndTimeOfLossFromUTC));
        }

        if (this.claim.dateAndTimeOfLossToUTC ==  null) {
          this.DateOfLossTo = "";
        }
        else {
          this.DateOfLossTo = this.getStringDate(new Date(this.claim.dateAndTimeOfLossToUTC));
        }

        this.BrokerComments = this.claim.comments;
        this.BrokerContact = this.claim.brokerContact;
        this.BrokerPhone = this.claim.brokerPhone;
        this.AmountOutstandingGBP = this.claim.amountOutstandingGBP;
        this.InsurerRef = this.claim.insurerRef;
        this.LossName = this.claim.lossName;
        this.claimantSubmissionDateTimeUTC = this.claim.claimantSubmissionDateTimeUTC;
        this.BrokerFirstAssignmentToCarrierDateTimeUTC = this.claim.brokerFirstAssignmentToCarrierDateTimeUTC;
        this.BrokerFirstViewDateTimeUTC = this.claim.brokerFirstViewDateTimeUTC;
        this.CarrierApprovalDateTimeUTC = this.claim.carrierApprovalDateTimeUTC;

        if (this.claim.status == "Submitted") {
          this.Status = "Claimant";
        }
        else if (this.claim.status == "Approved") {
          this.Status = this.claim.status;
        }
        else {
          // substring(4) so that we can remove the prefix 'With' when consuming the endpoint
          this.Status = this.claim.status.substring(4);
        }

        this.SCAPIndicator = this.claim.singleClaimsAgreementPartyIndicator;

        if (this.claim.dateAndTimeLossFirstReportedUTC == "") {
          this.BrokerAdvisedDate = this.getStringDate(new Date(this.claim.claimantSubmissionDateTimeUTC));
        }
        else {
          this.BrokerAdvisedDate = this.getStringDate(new Date(this.claim.dateAndTimeLossFirstReportedUTC));
        }

        this.BrokerAdvisedDate = this.getStringDate(new Date(this.claim.claimantSubmissionDateTimeUTC));
        this.UCR = this.claim.uniqueClaimsReference;
        this.LossAddress = this.claim.lossLocationAddressLine1;
        this.LossTown = this.claim.lossLocationAddressLine2;
        this.LossCounty = this.claim.lossLocationAddressCounty;
        this.LossPostcode = this.claim.lossLocationAddressPostcode;
        this.CountryOfLoss = this.claim.countryOfLoss;
        this.LossDescription = this.claim.lossDescription;
        this.ClaimAmount = this.claim.amountOfClaimGBP;
        this.newStatus = this.claim.status;
        

        this.responseStatusGET = response.status;
        this.daysNumbers();
        this.daysNumbersBroker();
        this.daysNumbersCarrier();
        this.daysNumbersApproved();
      });
  }

  getStringDate(date: Date): string {
    return (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
  }

  getStringDateTime(date: Date): string {
    return (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getUTCHours() + ":" + ((date.getMinutes()<10?'0':'') + date.getUTCMinutes()));
  }

  getStringDateDay(date: Date): string {
    return (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
  }

  acceptClaim(): void {
    this.patchClaimRecord.insurerRef = this.InsurerRef;
    this.Status= "Approved";
    this.patchClaimRecord.status = this.Status;
    this.patchClaimRecord._TextToPrependToExistingComments = this.Narrative;
    this.newStatus = this.Status;
    this.patchClaim();
  }

  saveClaim(): void {    
    this.patchClaimRecord.insurerRef = this.InsurerRef;

    if (this.Status == "Claimant") {
      this.patchClaimRecord.status = "Submitted";
    }
    else {
      this.patchClaimRecord.status = "With" + this.Status;
    }

    this.newStatus = this.patchClaimRecord.status;
    this.patchClaimRecord.singleClaimsAgreementPartyIndicator = this.SCAPIndicator;
    this.patchClaimRecord._TextToPrependToExistingComments = this.Narrative;
    this.patchClaim();
  }

  patchClaim(): void {
    // this.http.patch('http://localhost:55373/api/claims/' + this.Id, this.patchClaimRecord)
    this.http.patch('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims/' + this.Id, this.patchClaimRecord)
    .subscribe(
      response => {
        this.responseStatus = response.status;
        this.BrokerComments = response.json().comments;

        if (this.responseStatus == 200) {
          this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims/' + this.Id)
          .subscribe(
            response => {
              this.CarrierApprovalDateTimeUTC = response.json().carrierApprovalDateTimeUTC;
            });
          }
      }
    );
  }

  assignToSelected(event) {
    this.Status = event.option.value;
  }

  scapSelected(event) {
    this.SCAPIndicator = event.target.checked;
  }
}