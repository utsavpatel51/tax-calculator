"use client";

import { useMemo, useState } from "react";
import { DEFAULT_INPUTS } from "../constants/taxConstants.js";
import { calculateTax } from "../utils/taxCalculator.js";
import SalaryInputs from "./SalaryInputs.jsx";
import Recommendation from "./Recommendation.jsx";
import SalaryStructure from "./SalaryStructure.jsx";
import InHandSalary from "./InHandSalary.jsx";
import RegimeComparison from "./RegimeComparison.jsx";
import RulesPopover from "./RulesPopover.jsx";

export default function TaxCalculator() {
	const [inputs, setInputs] = useState(DEFAULT_INPUTS);

	const r = useMemo(() => calculateTax(inputs), [inputs]);

	const newBetter = r.newRegime.totalTax <= r.oldRegime.totalTax;
	const savings = Math.abs(r.newRegime.totalTax - r.oldRegime.totalTax);
	const monthlyDiff =
		(newBetter
			? r.newRegime.annualInHand - r.oldRegime.annualInHand
			: r.oldRegime.annualInHand - r.newRegime.annualInHand) / 12;

	return (
		<div className="container">
			<h1>Salary &amp; Tax Calculator</h1>
			<div className="subtitle">
				<RulesPopover>FY 2025-26 rules</RulesPopover> · Quickly find
				your in-hand salary based on your pay
			</div>

			<div className="grid">
				<SalaryInputs inputs={inputs} onChange={setInputs} />

				<div>
					<Recommendation newBetter={newBetter} savings={savings} />
					<SalaryStructure inputs={inputs} r={r} />
					<InHandSalary
						basePay={Number(inputs.basePay) || 0}
						empPF={r.empPF}
						corpNPSDeduction={r.corpNPSInHandDeduction}
						newRegime={r.newRegime}
						oldRegime={r.oldRegime}
						monthlyDiff={monthlyDiff}
					/>
					<RegimeComparison r={r} newBetter={newBetter} />
				</div>
			</div>

			<div className="disclaimer">
				<strong>Disclaimer:</strong> This tool is built purely to help
				people get a <em>basic, high-level understanding</em> of how
				Indian income tax works under the Old and New regimes for
				FY&nbsp;2025-26. Real-world tax liability depends on many
				factors that are <em>not</em> modelled here — including (but not
				limited to) surcharge on incomes above ₹50L, marginal relief
				edge cases, specific exemption rules, latest CBDT
				notifications/amendments, state-specific rules, and
				case-specific deductions. The numbers shown should{" "}
				<strong>not</strong> be used for actual tax filing, financial
				planning, legal, or compliance purposes. No guarantee is made
				about accuracy or completeness, and neither this tool nor its
				developer accepts any responsibility or liability for errors,
				omissions, or any loss arising from its use. For your actual tax
				situation, please consult a qualified Chartered Accountant or
				authorised tax advisor.
			</div>
			<div className="footer">
				FY 2025-26 tax rules · Educational tool only ·{" "}
				<a
					href="https://github.com/utsavpatel51/tax-calculator"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "inherit" }}
				>
					GitHub
				</a>{" "}
				·{" "}
				<a
					href="https://www.linkedin.com/in/utsavpatel51"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "inherit" }}
				>
					LinkedIn
				</a>
			</div>
		</div>
	);
}
