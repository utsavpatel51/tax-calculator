import { CITY_OPTIONS } from "../constants/taxConstants.js";

export default function SalaryInputs({ inputs, onChange }) {
	const update = (key) => (e) => {
		const v =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		onChange({ ...inputs, [key]: v });
	};

	return (
		<div className="card">
			<h2>💼 Your Salary Inputs</h2>

			<div className="field">
				<label>Base Pay (Annual, ₹)</label>
				<input
					type="number"
					value={inputs.basePay}
					onChange={update("basePay")}
				/>
				<div className="hint">
					Basic + HRA + other taxable components (Form 16 gross)
				</div>
			</div>

			<div className="row-2">
				<div className="field">
					<label>Basic % of Base Pay</label>
					<input
						type="number"
						value={inputs.basicPct}
						onChange={update("basicPct")}
					/>
				</div>
				<div className="field">
					<label>HRA % of Basic</label>
					<input
						type="number"
						value={inputs.hraPct}
						onChange={update("hraPct")}
					/>
				</div>
			</div>

			<h3>PF (Provident Fund)</h3>
			<div className="field">
				<label>Employee PF (Annual, ₹)</label>
				<input
					type="number"
					value={inputs.empPF}
					onChange={update("empPF")}
				/>
				<div className="hint">
					Most commonly this is <strong>12% of Basic</strong> or a
					fixed <strong>₹1,800/month (₹21,600/year)</strong>. Check
					your payslip to confirm.
					<br /> Employer PF is assumed on top of base pay and is
					tax-exempt.
				</div>
			</div>

			<h3>HRA - Rent Details</h3>
			<div className="row-2">
				<div className="field">
					<label>City Type</label>
					<select value={inputs.city} onChange={update("city")}>
						{CITY_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
				<div className="field">
					<label>Annual Rent (₹)</label>
					<input
						type="number"
						value={inputs.annualRent}
						onChange={update("annualRent")}
					/>
				</div>
			</div>
			<div className="hint">
				Metro = Delhi / Mumbai / Kolkata / Chennai (50% cap).
				<br />
				Non-Metro = All other cities (40% cap).
			</div>

			<h3>Corporate NPS - 80CCD(2)</h3>
			<div className="field">
				<label>Employer NPS contribution (% of Basic)</label>
				<input
					type="number"
					value={inputs.corpNPSPct}
					onChange={update("corpNPSPct")}
				/>
				<div className="hint">Max: 14% new regime / 10% old regime</div>
			</div>
			<label className="checkbox">
				<input
					type="checkbox"
					checked={inputs.corpNPSOnTop}
					onChange={update("corpNPSOnTop")}
				/>
				Corp NPS is ON TOP of Base Pay (else restructured from Base Pay)
			</label>

			<h3>Old Regime Deductions (ignored in New Regime)</h3>
			<div className="field">
				<label>Extra 80C (ELSS/PPF/LIC/etc.)</label>
				<input
					type="number"
					value={inputs.extra80C}
					onChange={update("extra80C")}
				/>
				<div className="hint">
					Total 80C auto-includes EPF; capped at ₹1.5L
				</div>
			</div>
			<div className="field">
				<label>80CCD(1B) Self NPS</label>
				<input
					type="number"
					value={inputs.nps80CCD1B}
					onChange={update("nps80CCD1B")}
				/>
				<div className="hint">Max ₹50,000</div>
			</div>
			<div className="field">
				<label>80D Health Insurance (self + parents)</label>
				<input
					type="number"
					value={inputs.ded80D}
					onChange={update("ded80D")}
				/>
				<div className="hint">
					Max ₹25,000 (self+family) + ₹25,000 parents (₹50,000 if
					senior). Up to ₹1,00,000 total.
				</div>
			</div>
			<div className="field">
				<label>24(b) Home Loan Interest</label>
				<input
					type="number"
					value={inputs.homeLoanInterest}
					onChange={update("homeLoanInterest")}
				/>
				<div className="hint">Max ₹2,00,000 (self-occupied)</div>
			</div>
			<div className="field">
				<label>80E Education Loan Interest</label>
				<input
					type="number"
					value={inputs.ded80E}
					onChange={update("ded80E")}
				/>
				<div className="hint">No cap · up to 8 years</div>
			</div>
		</div>
	);
}
