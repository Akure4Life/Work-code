export class Claim {

  badRequestReason: string;
  

    constructor(
      public ClassOfBusiness: string,
      public BrokerName: string,
      public InsuredName: string,
      public InsuredAddressLine1: string,
      public InsuredAddressLine2: string,
      public InsuredAddressCounty: string,
      public InsuredAddressPostcode: string,
      public InsuredContactName: string,
      public InsuredTelephoneNumber: number,
      public InsuredEmailAddress: string,
      public ClaimantName: string,
      public ClaimantAddressLine1: string,
      public ClaimantAddressLine2: string,
      public ClaimantAddressCounty: string,
      public ClaimantAddressPostcode: string,      
      public ClaimantTelephoneNumber: string,
      public ClaimantEmailAddress: string,
      public PolicyNumber: string,
      public PolicyInceptionDateAndTimeUTC: Date,
      public PolicyDueDateAndTimeUTC: Date,
      public DateAndTimeOfLossFromUTC: Date,
      public DateAndTimeOfLossToUTC: Date,
      public CountryOfLoss: string,
      public LossLocationAddressLine1: string,
      public LossLocationAddressLine2: string,
      public LossLocationAddressCounty: string,
      public LossLocationAddressPostcode: string,
      public DateAndTimeLossFirstReportedUTC: Date,
      public LossDescription: string,
      public AmountOfClaimGBP: number,
    ) { }
  }