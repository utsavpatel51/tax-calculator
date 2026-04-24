import { fmt } from "../utils/formatters.js";

function HRABreakdown({ r }) {
	const rules = [
		{
			key: "actual",
			label: "Actual HRA received",
			value: r.hraRuleActual,
		},
		{
			key: "cap",
			label: `${(r.hraCapPct * 100).toFixed(0)}% × Basic (${r.isMetro ? "metro" : "non-metro"})`,
			value: r.hraRuleCityCap,
		},
		{
			key: "rent",
			label: `Rent ${fmt(r.annualRent)} − 10% × Basic`,
			value: r.hraRuleRent,
		},
	];
	const minValue = r.hraExemption;

	return (
		<div className="hra-breakdown">
			<div className="hra-breakdown-caption">min of:</div>
			<ul className="hra-rule-list">
				{rules.map((rule, i) => {
					const isChosen =
						Math.round(rule.value) === Math.round(minValue);
					return (
						<li
							key={rule.key}
							className={isChosen ? "chosen" : ""}
						>
							<span className="rule-mark">
								{isChosen ? "✓" : `${i + 1}.`}
							</span>
							<span className="rule-label">{rule.label}</span>
							<span className="rule-value">
								{fmt(rule.value)}
							</span>
						</li>
					);
				})}
			</ul>
			{r.annualRent === 0 && (
				<div className="hra-note">
					No rent entered → rule 3 is ₹0, so exemption is ₹0.
				</div>
			)}
		</div>
	);
}

export default function SalaryStructure({ inputs, r }) {
	return (
		<div className="card">
			<h2>📊 Salary Structure</h2>
			<div className="ctc-panel">
				<strong>Gross Salary: {fmt(r.totalCTC)}</strong>
				&nbsp;=&nbsp;Base Pay {fmt(r.formGrossBase)}
				{inputs.corpNPSOnTop && r.corpNPS > 0 && (
					<> + Corp NPS {fmt(r.corpNPS)}</>
				)}
			</div>
			<ul className="kv-list">
				<li>
					<span className="k">Basic ({inputs.basicPct}%)</span>
					<span className="v">{fmt(r.basic)}</span>
				</li>
				<li>
					<span className="k">
						HRA ({inputs.hraPct}% of basic)
					</span>
					<span className="v">{fmt(r.hra)}</span>
				</li>
				{r.otherTaxable > 0 && (
					<li>
						<span className="k">Other taxable components</span>
						<span className="v">{fmt(r.otherTaxable)}</span>
					</li>
				)}
				<li>
					<span className="k">Employee PF (annual)</span>
					<span className="v">{fmt(r.empPF)}</span>
				</li>
				{r.corpNPS > 0 && (
					<li>
						<span className="k">
							Corporate NPS ({inputs.corpNPSPct}% of basic)
						</span>
						<span className="v">{fmt(r.corpNPS)}</span>
					</li>
				)}
			</ul>
			<div className="hra-exempt-group">
				<div className="hra-exempt-summary">
					<span className="k">HRA Exemption (Old regime only)</span>
					<span className="v">{fmt(r.hraExemption)}</span>
				</div>
				<HRABreakdown r={r} />
			</div>
		</div>
	);
}
