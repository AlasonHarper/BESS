
export interface IDevFeePaymentProfile  {
    paymentPercentageAtInvestorClosingDate: number,
    paymentPercentageAtLandSecuredDate: number,
    paymentPercentageAtGridSecuredDate:  number,
    paymentPercentageAtClosingOfDebtAgreementDate:  number,
    paymentPercentageAtFullyConsented:  number,
    paymentPercentageAtrTB:  number,
    paymentPercentageAtcOD:  number,
} 

export interface IDevFeePaymentDates  {
    investorClosingDate:string,
    landSecuredDate: string,
    gridSecuredDate: string,
    closingOfDebtAgreementDate: string,
    fullyConsented:string,
    rTB:string,
    cOD: string,
}