export const NEW_REGIME_SLABS = [
	{ from: 0, to: 400000, rate: 0 },
	{ from: 400000, to: 800000, rate: 0.05 },
	{ from: 800000, to: 1200000, rate: 0.1 },
	{ from: 1200000, to: 1600000, rate: 0.15 },
	{ from: 1600000, to: 2000000, rate: 0.2 },
	{ from: 2000000, to: 2400000, rate: 0.25 },
	{ from: 2400000, to: Infinity, rate: 0.3 },
];

export const OLD_REGIME_SLABS = [
	{ from: 0, to: 250000, rate: 0 },
	{ from: 250000, to: 500000, rate: 0.05 },
	{ from: 500000, to: 1000000, rate: 0.2 },
	{ from: 1000000, to: Infinity, rate: 0.3 },
];

export const STANDARD_DED_NEW = 75000;
export const STANDARD_DED_OLD = 50000;
export const CESS_RATE = 0.04;

// up to ₹12L taxable → full rebate under 87A new regime
export const REBATE_LIMIT_NEW = 1200000;
// up to ₹5L taxable → full rebate under 87A old regime
export const REBATE_LIMIT_OLD = 500000;

export const PROFESSIONAL_TAX_MONTHLY = 200; // ₹200/mo, max ₹2,400/yr
export const PROFESSIONAL_TAX_ANNUAL = PROFESSIONAL_TAX_MONTHLY * 12;

// Deduction caps
export const CAP_80C = 150000;
export const CAP_80CCD1B = 50000;
export const CAP_80D = 100000; // max when both self and parents are senior citizens
export const CAP_HOME_LOAN_INTEREST = 200000;
export const CAP_CORP_NPS_NEW_PCT = 0.14; // 14% of basic
export const CAP_CORP_NPS_OLD_PCT = 0.1; // 10% of basic

// HRA exemption caps
export const HRA_CAP_METRO_PCT = 0.5;
export const HRA_CAP_NON_METRO_PCT = 0.4;
export const HRA_RENT_DEDUCTION_PCT = 0.1; // rent - 10% basic

export const CITY_OPTIONS = [
	{ value: "metro", label: "Metro" },
	{ value: "non-metro", label: "Non-Metro" },
];

export const DEFAULT_INPUTS = {
	basePay: 1500000,
	basicPct: 50,
	hraPct: 100,
	empPF: 21600,
	corpNPSPct: 0,
	corpNPSOnTop: false,
	city: "metro",
	annualRent: 0,
	extra80C: 0,
	nps80CCD1B: 0,
	ded80D: 0,
	homeLoanInterest: 0,
	ded80E: 0,
};
