import { Injectable, signal } from "@angular/core";
import { InvestmentData } from "./investment-input.model";
import { InvestmentsResults } from "./investment-results.model";

@Injectable({
    providedIn: "root"
})
export class InvestmentService {
    resultData = signal<InvestmentsResults[] | undefined>(undefined);
    calculateInvestmentResults(data: InvestmentData) {
        const annualData = [];
        const { initialInvestment, annualInvestment, expectedReturn, duration } = data; //destructuring
        let investmentValue = initialInvestment;

        for (let i = 0; i < duration; i++) {
            const year = i + 1;
            const interestEarnedInYear = investmentValue * (expectedReturn / 100);
            investmentValue += interestEarnedInYear + annualInvestment;
            const totalInterest =
                investmentValue - annualInvestment * year - initialInvestment;
            annualData.push({
                year: year,
                interest: interestEarnedInYear,
                valueEndOfYear: investmentValue,
                annualInvestment: annualInvestment,
                totalInterest: totalInterest,
                totalAmountInvested: initialInvestment + annualInvestment * year,
            });
        }

        this.resultData.set(annualData);
    }
}