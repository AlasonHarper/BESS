import { IDevFeePaymentDates, IDevFeePaymentProfile } from "./type";

export const DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE = {
    paymentPercentageAtInvestorClosingDate: 0,
    paymentPercentageAtLandSecuredDate: 0,
    paymentPercentageAtGridSecuredDate: 0,
    paymentPercentageAtClosingOfDebtAgreementDate: 0,
    paymentPercentageAtFullyConsented: 0,
    paymentPercentageAtrTB: 100,
    paymentPercentageAtcOD: 0,
} as IDevFeePaymentProfile

export const DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES  = {
    investorClosingDate: "2024-06-01",
    landSecuredDate: "2024-05-05",
    gridSecuredDate: "2024-01-02",
    closingOfDebtAgreementDate: "2024-09-01",
    fullyConsented: "2024-11-01",
    rTB: "2025-05-01",
    cOD: "2028-01-01",
} as IDevFeePaymentDates