import { fmt } from "../utils/formatters.js";
import { PROFESSIONAL_TAX_MONTHLY } from "../constants/taxConstants.js";

function RegimeBreakdown({ label, basePay, empPF, corpNPSDeduction, regime }) {
	const monthlyBase = basePay / 12;
	const monthlyPF = empPF / 12;
	const monthlyNPS = corpNPSDeduction / 12;
	const monthlyTax = regime.totalTax / 12;
	return (
		<div className="inhand-card breakdown">
			<div className="label">{label}</div>
			<ul className="kv-list breakdown-list">
				<li>
					<span className="k">Base Pay</span>
					<span className="v">{fmt(monthlyBase)}</span>
				</li>
				<li>
					<span className="k">- Employee PF</span>
					<span className="v">-{fmt(monthlyPF)}</span>
				</li>
				{corpNPSDeduction > 0 && (
					<li>
						<span className="k">- Corp NPS (restructured)</span>
						<span className="v">-{fmt(monthlyNPS)}</span>
					</li>
				)}
				<li>
					<span className="k">- Prof. Tax</span>
					<span className="v">-{fmt(PROFESSIONAL_TAX_MONTHLY)}</span>
				</li>
				<li>
					<span className="k">- Income Tax</span>
					<span className="v">-{fmt(monthlyTax)}</span>
				</li>
				<li className="final-row">
					<span className="k">In-Hand</span>
					<span className="v">{fmt(regime.monthlyInHand)}</span>
				</li>
			</ul>
			<div className="sub">~{fmt(regime.annualInHand)}/yr</div>
		</div>
	);
}

export default function InHandSalary({
	basePay,
	empPF,
	corpNPSDeduction,
	newRegime,
	oldRegime,
	monthlyDiff,
}) {
	return (
		<div className="card">
			<h2>💰 Estimated In-Hand Salary (per month)</h2>
			<div className="inhand-grid">
				<RegimeBreakdown
					label="New Regime"
					basePay={basePay}
					empPF={empPF}
					corpNPSDeduction={corpNPSDeduction}
					regime={newRegime}
				/>
				<RegimeBreakdown
					label="Old Regime"
					basePay={basePay}
					empPF={empPF}
					corpNPSDeduction={corpNPSDeduction}
					regime={oldRegime}
				/>
				<div
					className="inhand-card"
					style={{
						background: "#e8f5e9",
						borderColor: "#a5d6a7",
					}}
				>
					<div className="label">Difference</div>
					<div className="value" style={{ color: "#2e7d32" }}>
						{fmt(monthlyDiff)}
					</div>
					<div className="sub">/month better</div>
				</div>
			</div>
			<div className="info-note">
				In-hand = Base Pay - Employee PF - Prof. Tax (₹200/mo) - Income
				Tax. Prof. Tax varies by state; ₹200/mo is the most common slab.
			</div>
		</div>
	);
}
