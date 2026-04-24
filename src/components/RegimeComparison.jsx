import {
	NEW_REGIME_SLABS,
	OLD_REGIME_SLABS,
	STANDARD_DED_NEW,
	STANDARD_DED_OLD,
} from "../constants/taxConstants.js";
import { fmt } from "../utils/formatters.js";
import RegimeCard from "./RegimeCard.jsx";

function buildNewDeductions(r) {
	return [
		{
			label: "Gross Salary (incl. Corp NPS on top)",
			value: fmt(r.grossSalary),
		},
		{
			label: "Standard Deduction",
			value: `-${fmt(STANDARD_DED_NEW)}`,
		},
		{
			label: "80CCD(2) Corp NPS (max 14% basic)",
			value: r.corpNPSDedNew > 0 ? `-${fmt(r.corpNPSDedNew)}` : "—",
		},
	];
}

function buildOldDeductions(r) {
	return [
		{ label: "Gross Salary", value: fmt(r.grossSalary) },
		{
			label: "HRA Exemption",
			value: r.hraExemption > 0 ? `-${fmt(r.hraExemption)}` : "—",
		},
		{
			label: "Standard Deduction",
			value: `-${fmt(STANDARD_DED_OLD)}`,
		},
		{
			label: "80C (EPF + others, cap ₹1.5L)",
			value: r.total80C > 0 ? `-${fmt(r.total80C)}` : "—",
		},
		{
			label: "80CCD(1B) Self NPS",
			value: r.nps80CCD1B > 0 ? `-${fmt(r.nps80CCD1B)}` : "—",
		},
		{
			label: "80D Health Insurance",
			value: r.ded80D > 0 ? `-${fmt(r.ded80D)}` : "—",
		},
		{
			label: "24(b) Home Loan Interest",
			value:
				r.dedHomeLoanInterest > 0
					? `-${fmt(r.dedHomeLoanInterest)}`
					: "—",
		},
		{
			label: "80E Education Loan Interest",
			value: r.ded80E > 0 ? `-${fmt(r.ded80E)}` : "—",
		},
		{
			label: "80CCD(2) Corp NPS (max 10% basic)",
			value: r.corpNPSDedOld > 0 ? `-${fmt(r.corpNPSDedOld)}` : "—",
		},
	];
}

export default function RegimeComparison({ r, newBetter }) {
	return (
		<div className="card">
			<h2>📈 Slab-wise Tax Breakdown</h2>
			<div className="regime-grid">
				<RegimeCard
					title="New Regime"
					data={r.newRegime}
					slabs={NEW_REGIME_SLABS}
					winner={newBetter}
					deductionList={buildNewDeductions(r)}
					gross={r.grossSalary}
				/>
				<RegimeCard
					title="Old Regime"
					data={r.oldRegime}
					slabs={OLD_REGIME_SLABS}
					winner={!newBetter}
					deductionList={buildOldDeductions(r)}
					gross={r.grossSalary}
				/>
			</div>
			<div className="info-note">
				<strong>Note:</strong> Rebate u/s 87A zeroes out tax if taxable
				income ≤ ₹12L (new) or ≤ ₹5L (old). Cess of 4% applies to
				computed tax. Surcharge (10-25%) above ₹50L not modeled in this
				simple version.
			</div>
		</div>
	);
}
