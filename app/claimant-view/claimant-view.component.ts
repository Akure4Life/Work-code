import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Claim } from '../claim';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'claimant-view',
  templateUrl: './claimant-view.component.html',
  styleUrls: ['./claimant-view.component.css']
})
export class ClaimantViewComponent implements OnInit {

  responseStatus: number;
  
  Id: string;
  claim: any;

  classOfBusiness: string;
  brokerName: string;

  insuredName: string;
  insuredContactName: string;
  insuredTelephoneNumber: string;
  insuredEmailAddress: string;
  insuredAddressLine1: string;
  insuredAddressLine2: string;
  insuredAddressCounty: string;
  insuredAddressPostcode: string;

  claimantName: string;
  claimantTelephoneNumber: string;
  claimantEmailAddress: string;
  claimantAddressLine1: string;
  claimantAddressLine2: string;
  claimantAddressCounty: string;
  claimantAddressPostcode: string;

  policyNumber: string;
  policyInceptionDateAndTimeUTC: string;
  policyDueDateAndTimeUTC: string;

  dateAndTimeOfLossFromUTC: string;
  dateAndTimeOfLossToUTC: string;
  dateAndTimeLossFirstReportedUTC: string;
  countryOfLoss: string;
  amountOfClaimGBP: number;
  lossLocationAddressLine1: string;
  lossLocationAddressLine2: string;
  lossLocationAddressCounty: string;
  lossLocationAddressPostcode: string;
  lossDescription: string;
  narrative: string;
  claimantComments: string;
  brokerCommentPosition: number;
  carrierCommentPosition: number;
  latestComment: string[];

  uniqueClaimsSubmissionReference: string;

  patchClaimRecord: any = {};
  status: string;
  insurerRef: string;

  claimantSubmissionDateTimeUTC: string;
  DateOfLossFrom: string;
  BrokerFirstAssignmentToCarrierDateTimeUTC: string;
  BrokerFirstViewDateTimeUTC: string;
  CarrierApprovalDateTimeUTC: string; 
  newStatus: string;

  DateOfLossFromDate: string;

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      this.Id = params.id;
    });

    this.getClaim();
  }

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

  getClaim() {
    // this.http.get('http://localhost:55373/api/claims/' + this.Id)
    this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims/' + this.Id)
    .subscribe(
      response => {
        this.claim = response.json();

        this.classOfBusiness = this.claim.classOfBusiness;
        this.insuredName = this.claim.insuredName;
        this.insuredContactName = this.claim.insuredContactName;
        this.insuredTelephoneNumber = this.claim.insuredTelephoneNumber;
        this.insuredEmailAddress = this.claim.insuredEmailAddress;
        this.insuredAddressLine1 = this.claim.insuredAddressLine1;
        this.insuredAddressLine2 = this.claim.insuredAddressLine2;
        this.insuredAddressCounty = this.claim.insuredAddressCounty;
        this.insuredAddressPostcode = this.claim.insuredAddressPostcode;
        this.claimantName = this.claim.claimantName;
        this.claimantTelephoneNumber = this.claim.claimantTelephoneNumber;
        this.claimantEmailAddress = this.claim.claimantEmailAddress;
        this.claimantAddressLine1 = this.claim.claimantAddressLine1;
        this.claimantAddressLine2 = this.claim.claimantAddressLine2;
        this.claimantAddressCounty = this.claim.claimantAddressCounty;
        this.claimantAddressPostcode = this.claim.claimantAddressPostcode;
        this.policyNumber = this.claim.policyNumber;

        this.policyInceptionDateAndTimeUTC = (this.claim.policyInceptionDateAndTimeUTC == null) ? "" : this.getStringDate(new Date(this.claim.policyInceptionDateAndTimeUTC));
        this.policyDueDateAndTimeUTC = (this.claim.policyDueDateAndTimeUTC == null) ? "" : this.getStringDate(new Date(this.claim.policyDueDateAndTimeUTC));        
        this.dateAndTimeOfLossFromUTC = (this.claim.dateAndTimeOfLossFromUTC == null) ? "" : this.getStringDateTime(new Date(this.claim.dateAndTimeOfLossFromUTC));
        this.dateAndTimeOfLossToUTC = (this.claim.dateAndTimeOfLossToUTC == null) ? "" : this.getStringDate(new Date(this.claim.dateAndTimeOfLossToUTC));
        this.dateAndTimeLossFirstReportedUTC = (this.claim.dateAndTimeLossFirstReportedUTC) == null ? "" : this.getStringDate(new Date(this.claim.dateAndTimeLossFirstReportedUTC));
        this.countryOfLoss = this.claim.countryOfLoss;
        this.amountOfClaimGBP = this.claim.amountOfClaimGBP;
        this.lossLocationAddressLine1 = this.claim.lossLocationAddressLine1;
        this.lossLocationAddressLine2 = this.claim.lossLocationAddressLine2;
        this.lossLocationAddressCounty = this.claim.lossLocationAddressCounty;
        this.lossLocationAddressPostcode = this.claim.lossLocationAddressPostcode;
        this.lossDescription = this.claim.lossDescription;
        this.narrative = this.claim.comments;
        this.uniqueClaimsSubmissionReference = this.claim.uniqueClaimsSubmissionReference;
        this.insurerRef = this.claim.insurerRef;
        this.claimantSubmissionDateTimeUTC = this.claim.claimantSubmissionDateTimeUTC;
        this.status = this.claim.status;
        this.BrokerFirstAssignmentToCarrierDateTimeUTC = this.claim.brokerFirstAssignmentToCarrierDateTimeUTC;
        this.BrokerFirstViewDateTimeUTC = this.claim.brokerFirstViewDateTimeUTC;
        this.CarrierApprovalDateTimeUTC = this.claim.carrierApprovalDateTimeUTC;
        this.DateOfLossFrom = this.getStringDateTime(new Date(this.claim.dateAndTimeOfLossFromUTC));
        this.DateOfLossFromDate = this.getStringDate(new Date(this.claim.dateAndTimeOfLossFromUTC));
        this.newStatus = this.claim.status;


        if (this.narrative != null) {

          this.latestComment = this.narrative.split("\r\n\r\n");
          this.narrative = this.latestComment[0] + "\r\n\n\n" + this.latestComment[1];

          this.brokerCommentPosition = this.narrative.indexOf("[Broker");
          this.carrierCommentPosition = this.narrative.indexOf("[Carrier");
        }

        this.daysNumbers();
        this.daysNumbersBroker();
        this.daysNumbersCarrier();
        this.daysNumbersApproved();
      });    
  }

  getStringDateTime(date: Date): string {
    return (((date.getDate()<10?'0':'') + date.getDate()) + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + ((date.getMinutes()<10?'0':'') + date.getMinutes()));
  }

  getStringDate(date: Date): string {
    return (((date.getDate()<10?'0':'') + date.getDate()) + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
  }

  submitUpdate(): void {
    
    if (this.narrative != null && ((this.brokerCommentPosition >= 0) || (this.carrierCommentPosition >= 0))) {

      if (this.brokerCommentPosition >= 0) {
        this.status = "WithBroker";
      }
      else {
        this.status = "WithCarrier";
      }
    }
    else {
      this.status = "Submitted";
    }

    this.newStatus = this.patchClaimRecord.status;
    this.patchClaimRecord.lossDescription = this.lossDescription;
    this.patchClaimRecord.status = this.status;
    this.patchClaimRecord._TextToPrependToExistingComments = this.claimantComments;
    this.patchClaim();
  }

  patchClaim(): void {
    // this.http.patch('http://localhost:55373/api/claims/' + this.Id, this.patchClaimRecord)
    this.http.patch('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims/' + this.Id, this.patchClaimRecord)
    .subscribe(
      response => {
        this.responseStatus = response.status;

        if (this.responseStatus == 200) {
          this.http.get('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims/' + this.Id)
          .subscribe(
            response => {
              this.BrokerFirstViewDateTimeUTC = response.json().brokerFirstViewDateTimeUTC;
            });
          }
        }
    );
  }

  isSubmitDisabled(form: NgForm): boolean {
    
    if (!form.valid) {
      $(('#submit')).css("cursor", "not-allowed");
      return true;
    }
    else {
      $(('#submit')).css("cursor", "pointer");
      return false;
    }
  }

  sendEvent(x) {
    console.log(x);
  }
}
