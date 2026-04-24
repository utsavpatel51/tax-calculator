import { fmt } from "../utils/formatters.js";
import SlabTable from "./SlabTable.jsx";

export default function RegimeCard({
	title,
	data,
	slabs,
	winner,
	deductionList,
	gross,
}) {
	const cardClass = `regime-card ${winner ? "winner" : ""}`.trim();

	return (
		<div className={cardClass}>
			<div className="regime-title">
				<h3>{title}</h3>
				{winner && <span className="badge">✓ BETTER</span>}
			</div>

			<ul className="kv-list">
				{deductionList.map((d, i) => (
					<li key={i}>
						<span className="k">{d.label}</span>
						<span className="v">{d.value}</span>
					</li>
				))}
				<li className="summary-row">
					<span className="k">Taxable Income</span>
					<span className="v">{fmt(data.taxable)}</span>
				</li>
			</ul>

			<h3
				style={{
					textTransform: "none",
					color: "#333",
					marginTop: 10,
				}}
			>
				Slab-wise Tax
			</h3>
			<SlabTable breakdown={data.slabBreakdown} slabs={slabs} />

			<ul className="kv-list" style={{ marginTop: 8 }}>
				<li>
					<span className="k">Total Slab Tax</span>
					<span className="v">{fmt(data.slabTax)}</span>
				</li>
				{data.rebateApplied && (
					<li>
						<span className="k">Rebate u/s 87A</span>
						<span className="v">-{fmt(data.slabTax)}</span>
					</li>
				)}
				{data.marginalReliefApplied && (
					<li>
						<span className="k">Marginal Relief u/s 87A</span>
						<span className="v">-{fmt(data.marginalRelief)}</span>
					</li>
				)}
				<li>
					<span className="k">Health & Education Cess (4%)</span>
					<span className="v">{fmt(data.cess)}</span>
				</li>
				<li className="final-row">
					<span className="k">Total Tax Payable</span>
					<span className="v">{fmt(data.totalTax)}</span>
				</li>
				<li>
					<span className="k">Effective Rate (on gross)</span>
					<span className="v">
						{gross > 0
							? ((data.totalTax / gross) * 100).toFixed(2)
							: 0}
						%
					</span>
				</li>
			</ul>
		</div>
	);
}
