import {
	NEW_REGIME_SLABS,
	OLD_REGIME_SLABS,
	STANDARD_DED_NEW,
	STANDARD_DED_OLD,
	CESS_RATE,
	REBATE_LIMIT_NEW,
	REBATE_LIMIT_OLD,
	PROFESSIONAL_TAX_ANNUAL,
	CAP_80C,
	CAP_80CCD1B,
	CAP_80D,
	CAP_HOME_LOAN_INTEREST,
	CAP_CORP_NPS_NEW_PCT,
	CAP_CORP_NPS_OLD_PCT,
	HRA_CAP_METRO_PCT,
	HRA_CAP_NON_METRO_PCT,
	HRA_RENT_DEDUCTION_PCT,
} from "../constants/taxConstants.js";

export function calcSlabTax(taxable, slabs) {
	let total = 0;
	const breakdown = [];
	for (const s of slabs) {
		if (taxable <= s.from) continue;
		const inThisSlab = Math.min(taxable - s.from, s.to - s.from);
		if (inThisSlab > 0) {
			const tax = inThisSlab * s.rate;
			breakdown.push({
				from: s.from,
				to: s.to === Infinity ? null : s.to,
				rate: s.rate,
				amount: inThisSlab,
				tax,
			});
			total += tax;
		}
	}
	return { total, breakdown };
}

export function calculateTax(inputs) {
	const basePay = Number(inputs.basePay) || 0;
	const basicPct = (Number(inputs.basicPct) || 0) / 100;
	const hraPct = (Number(inputs.hraPct) || 0) / 100;
	const basic = basePay * basicPct;
	const hra = basic * hraPct;
	const otherTaxable = Math.max(0, basePay - basic - hra);

	const empPF = Number(inputs.empPF) || 0;

	const corpNPSPct = (Number(inputs.corpNPSPct) || 0) / 100;
	const corpNPS = basic * corpNPSPct;

	const formGrossBase = basePay;
	const corpNPSAddedToGross = !!inputs.corpNPSOnTop;
	const grossSalary =
		formGrossBase + (corpNPSAddedToGross ? corpNPS : 0);
	const totalCTC = grossSalary;

	// HRA exemption — minimum of 3 rules (Section 10(13A))
	const annualRent = Number(inputs.annualRent) || 0;
	const isMetro = inputs.city === "metro";
	const hraCapPct = isMetro ? HRA_CAP_METRO_PCT : HRA_CAP_NON_METRO_PCT;
	const hraRuleActual = hra;
	const hraRuleCityCap = basic * hraCapPct;
	const hraRuleRent = Math.max(
		0,
		annualRent - HRA_RENT_DEDUCTION_PCT * basic,
	);
	const hraExemption = Math.max(
		0,
		Math.min(hraRuleActual, hraRuleCityCap, hraRuleRent),
	);

	// 80CCD(2) caps
	const corpNPSDedNew = Math.min(corpNPS, CAP_CORP_NPS_NEW_PCT * basic);
	const corpNPSDedOld = Math.min(corpNPS, CAP_CORP_NPS_OLD_PCT * basic);

	// 80C family
	const extra80C = Number(inputs.extra80C) || 0;
	const total80C = Math.min(CAP_80C, empPF + extra80C);
	const nps80CCD1B = Math.min(CAP_80CCD1B, Number(inputs.nps80CCD1B) || 0);
	const ded80D = Math.min(CAP_80D, Number(inputs.ded80D) || 0);
	const dedHomeLoanInterest = Math.min(
		CAP_HOME_LOAN_INTEREST,
		Number(inputs.homeLoanInterest) || 0,
	);
	const ded80E = Number(inputs.ded80E) || 0;

	// NEW REGIME
	let newTaxable =
		grossSalary -
		STANDARD_DED_NEW -
		(corpNPSAddedToGross ? corpNPSDedNew : 0);
	if (!corpNPSAddedToGross) newTaxable -= corpNPSDedNew;
	newTaxable = Math.max(0, newTaxable);

	const newSlab = calcSlabTax(newTaxable, NEW_REGIME_SLABS);
	let newTaxBeforeCess = newSlab.total;
	let newRebateApplied = false;
	let newMarginalRelief = 0;
	if (newTaxable <= REBATE_LIMIT_NEW) {
		newRebateApplied = newSlab.total > 0;
		newTaxBeforeCess = 0;
	} else {
		const excess = newTaxable - REBATE_LIMIT_NEW;
		if (newSlab.total > excess) {
			newMarginalRelief = newSlab.total - excess;
			newTaxBeforeCess = excess;
		}
	}
	const newCess = newTaxBeforeCess * CESS_RATE;
	const newTotalTax = newTaxBeforeCess + newCess;

	// OLD REGIME
	let oldTaxable =
		grossSalary -
		hraExemption -
		STANDARD_DED_OLD -
		total80C -
		nps80CCD1B -
		ded80D -
		dedHomeLoanInterest -
		ded80E -
		(corpNPSAddedToGross ? corpNPSDedOld : 0);
	if (!corpNPSAddedToGross) oldTaxable -= corpNPSDedOld;
	oldTaxable = Math.max(0, oldTaxable);

	const oldSlab = calcSlabTax(oldTaxable, OLD_REGIME_SLABS);
	let oldTaxBeforeCess = oldSlab.total;
	let oldRebateApplied = false;
	let oldMarginalRelief = 0;
	if (oldTaxable <= REBATE_LIMIT_OLD) {
		oldRebateApplied = oldSlab.total > 0;
		oldTaxBeforeCess = 0;
	} else {
		const excess = oldTaxable - REBATE_LIMIT_OLD;
		if (oldSlab.total > excess) {
			oldMarginalRelief = oldSlab.total - excess;
			oldTaxBeforeCess = excess;
		}
	}
	const oldCess = oldTaxBeforeCess * CESS_RATE;
	const oldTotalTax = oldTaxBeforeCess + oldCess;

	// when NPS is restructured from base pay, it leaves the employee's pocket
	const corpNPSInHandDeduction = corpNPSAddedToGross ? 0 : corpNPS;
	const newAnnualInHand =
		basePay - empPF - corpNPSInHandDeduction - PROFESSIONAL_TAX_ANNUAL - newTotalTax;
	const oldAnnualInHand =
		basePay - empPF - corpNPSInHandDeduction - PROFESSIONAL_TAX_ANNUAL - oldTotalTax;

	return {
		basic,
		hra,
		otherTaxable,
		empPF,
		corpNPS,
		corpNPSInHandDeduction,
		totalCTC,
		formGrossBase,
		grossSalary,
		hraExemption,
		annualRent,
		hraCapPct,
		isMetro,
		hraRuleActual,
		hraRuleCityCap,
		hraRuleRent,
		total80C,
		nps80CCD1B,
		ded80D,
		dedHomeLoanInterest,
		ded80E,
		corpNPSDedNew,
		corpNPSDedOld,
		newRegime: {
			taxable: newTaxable,
			slabBreakdown: newSlab.breakdown,
			slabTax: newSlab.total,
			taxBeforeCess: newTaxBeforeCess,
			cess: newCess,
			totalTax: newTotalTax,
			annualInHand: newAnnualInHand,
			monthlyInHand: newAnnualInHand / 12,
			rebateApplied: newRebateApplied,
			marginalRelief: newMarginalRelief,
			marginalReliefApplied: newMarginalRelief > 0,
		},
		oldRegime: {
			taxable: oldTaxable,
			slabBreakdown: oldSlab.breakdown,
			slabTax: oldSlab.total,
			taxBeforeCess: oldTaxBeforeCess,
			cess: oldCess,
			totalTax: oldTotalTax,
			annualInHand: oldAnnualInHand,
			monthlyInHand: oldAnnualInHand / 12,
			rebateApplied: oldRebateApplied,
			marginalRelief: oldMarginalRelief,
			marginalReliefApplied: oldMarginalRelief > 0,
		},
	};
}
