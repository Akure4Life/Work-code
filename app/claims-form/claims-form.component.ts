import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Claim } from '../claim';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css']
})

export class ClaimsFormComponent implements OnInit {

  public claimsData : string = null;
  claim: Claim;
  myData: any;
  claimForm: NgForm;
  PolicyInceptionDateAndTimeUTC: string;
  PolicyDueDateAndTimeUTC: string;
  DateAndTimeOfLossFromUTC: string;
  DateAndTimeOfLossFromUTCPopUp: string;
  DateAndTimeOfLossToUTC: string;
  DateAndTimeLossFirstReportedUTC: string;
  CountryOfLoss: string;
  claimantSubmissionDateTimeUTC: string;

  constructor(private _http: Http) {}

  formatDates(form) {
    
    if (form.PolicyInceptionDateAndTimeUTC != undefined && form.PolicyInceptionDateAndTimeUTC != "") {
      form.PolicyInceptionDateAndTimeUTC = new Date(parseInt(this.PolicyInceptionDateAndTimeUTC.split('/')[2]), 
        (parseInt(this.PolicyInceptionDateAndTimeUTC.split('/')[1]))-1,
        parseInt(this.PolicyInceptionDateAndTimeUTC.split('/')[0])).toISOString();
    }

    if (form.PolicyDueDateAndTimeUTC != undefined && form.PolicyDueDateAndTimeUTC != "") {
      form.PolicyDueDateAndTimeUTC = new Date(parseInt(this.PolicyDueDateAndTimeUTC.split('/')[2]), 
        (parseInt(this.PolicyDueDateAndTimeUTC.split('/')[1]))-1,
        parseInt(this.PolicyDueDateAndTimeUTC.split('/')[0])).toISOString();
    }

    if (this.DateAndTimeOfLossFromUTC != undefined && this.DateAndTimeOfLossFromUTC != "") {
      this.DateAndTimeOfLossFromUTC = new Date(parseInt(this.DateAndTimeOfLossFromUTC.split('/')[2]), 
        (parseInt(this.DateAndTimeOfLossFromUTC.split('/')[1]))-1,
        parseInt(this.DateAndTimeOfLossFromUTC.split('/')[0]),
        (parseInt(this.DateAndTimeOfLossFromUTC.substring(11, 13)))+1,
        parseInt(this.DateAndTimeOfLossFromUTC.substring(14, 16))).toISOString();

        this.DateAndTimeOfLossFromUTCPopUp = this.DateAndTimeOfLossFromUTC;
    }

    if (this.DateAndTimeOfLossToUTC != undefined && this.DateAndTimeOfLossToUTC != "") {
      this.DateAndTimeOfLossToUTC = new Date(parseInt(this.DateAndTimeOfLossToUTC.split('/')[2]), 
        (parseInt(this.DateAndTimeOfLossToUTC.split('/')[1]))-1,
        parseInt(this.DateAndTimeOfLossToUTC.split('/')[0])).toISOString();

    }

    if (form.DateAndTimeLossFirstReportedUTC != undefined && form.DateAndTimeLossFirstReportedUTC != "") {
      form.DateAndTimeLossFirstReportedUTC = new Date(parseInt(this.DateAndTimeLossFirstReportedUTC.split('/')[2]), 
        (parseInt(this.DateAndTimeLossFirstReportedUTC.split('/')[1]))-1,
        parseInt(this.DateAndTimeLossFirstReportedUTC.split('/')[0])).toISOString();
    }
  }

  countrySelected(event) {
    this.CountryOfLoss = event.option.value;
  }

  submitClaim(form): void {
    
    this.formatDates(form);

    this.claimForm = form;
    this.claim = new Claim("Property",
                          "City Broking Ltd",
                          form.InsuredName,
                          form.InsuredAddressLine1,
                          form.InsuredAddressLine2,
                          form.InsuredAddressCounty,
                          form.InsuredAddressPostcode,
                          form.InsuredContactName,
                          form.InsuredTelephoneNumber,
                          form.InsuredEmailAddress,
                          form.ClaimantName,
                          form.ClaimantAddressLine1,
                          form.ClaimantAddressLine2,
                          form.ClaimantAddressCounty,
                          form.ClaimantAddressPostcode,
                          form.ClaimantTelephoneNumber,
                          form.ClaimantEmailAddress,
                          form.PolicyNumber,
                          form.PolicyInceptionDateAndTimeUTC,
                          form.PolicyDueDateAndTimeUTC,
                          new Date(this.DateAndTimeOfLossFromUTC),
                          new Date(this.DateAndTimeOfLossToUTC),
                          this.CountryOfLoss,
                          form.LossLocationAddressLine1,
                          form.LossLocationAddressLine2,
                          form.LossLocationAddressCounty,
                          form.LossLocationAddressPostcode,
                          form.DateAndTimeLossFirstReportedUTC,
                          form.LossDescription,
                          form.AmountOfClaimGBP
    );

    this.postClaim(this.claim);
  }

  postClaim(claim: Claim) {
    // this._http.post('http://localhost:55373/api/claims', claim)
    this._http.post('http://lmnetcoredevtest-env.eu-west-1.elasticbeanstalk.com/api/claims', claim)
      .subscribe(
        response => {
          this.myData = response.json();
          this.claimantSubmissionDateTimeUTC = this.myData.claimantSubmissionDateTimeUTC;
        }
      );
  }

  openDateTimePicker() {
    $('#DateAndTimeOfLossFromUTC').datetimepicker({
      format: 'DD/MM/YYYY HH:mm',
      sideBySide: true,
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

  $("#DateAndTimeOfLossFromUTC").on("dp.change", function (e) {
    this.DateAndTimeOfLossFromUTC = e.target.value;
    });
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
  
  myControl: FormControl = new FormControl();

  options = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas, The',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burma',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo (Democratic Republic)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia, The',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea (North)',
    'Korea (South)',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'St Kitts and Nevis',
    'St Lucia',
    'St Vincent',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Argentina',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];

  filteredOptions: Observable<string[]>;

  ngOnInit() {
   
    this.openDateTimePicker();
    this.openDatePicker();
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val.toString()))
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  formatDate(date: string): string {
    if (date != null || date != undefined) {
      this.DateAndTimeOfLossToUTC = date.substring(0, 10);
    }
    else {
      this.DateAndTimeOfLossToUTC = "";
    }

    return this.DateAndTimeOfLossToUTC;

  }

  buttonIsDisabled:boolean=true;
  public onAddComment(event: string): void {
   this.buttonIsDisabled=true;
   let passedString = event;

   if (/\S/.test(passedString)) {
       this.buttonIsDisabled=false;
   }
  }

  ClaimantAddressLine1: string;
  ClaimantAddressLine2: string;
  ClaimantAddressCounty: string;
  ClaimantAddressPostcode: string;

  copyAddrs(event, form) { 
    if(event.target.checked) {
      this.ClaimantAddressLine1 = form.InsuredAddressLine1
      this.ClaimantAddressLine2 = form.InsuredAddressLine2
      this.ClaimantAddressCounty = form.InsuredAddressCounty
      this.ClaimantAddressPostcode = form.InsuredAddressPostcode
    }
    else {
      this.ClaimantAddressLine1 = ''
      this.ClaimantAddressLine2 = ''
      this.ClaimantAddressCounty = ''
      this.ClaimantAddressPostcode = ''
    }
  }

  submitButtonMessageShow(): void {

    if ($('#submitClaim').prop('disabled')) {
      $('#userMessage').popover('show');
    }
  }

  submitButtonMessageHide(): void {

    if ($('#submitClaim').prop('disabled')) {
      $('#userMessage').popover('hide');
    }
  }

   
  daysNumbers() {
    var date1 = new Date(this.DateAndTimeOfLossFromUTC);
    var date2 = new Date(this.claimantSubmissionDateTimeUTC);
    var date1InDays = Math.floor(date1.getTime() / (1000 * 3600 * 24));
    var date2InDays = Math.floor(date2.getTime() / (1000 * 3600 * 24));
    var diffDays = date2InDays - date1InDays; 
    return diffDays; 
  }
}