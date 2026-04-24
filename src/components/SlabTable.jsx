import { fmt } from "../utils/formatters.js";

export default function SlabTable({ breakdown, slabs }) {
	return (
		<div style={{ overflowX: "auto" }}>
		<table>
			<thead>
				<tr>
					<th>Slab</th>
					<th style={{ textAlign: "right" }}>Rate</th>
					<th style={{ textAlign: "right" }}>Tax</th>
				</tr>
			</thead>
			<tbody>
				{slabs.map((s, i) => {
					const b = breakdown.find((br) => br.from === s.from);
					const label =
						s.to === Infinity
							? `Above ${fmt(s.from)}`
							: `${fmt(s.from)} – ${fmt(s.to)}`;
					return (
						<tr key={i}>
							<td>{label}</td>
							<td className="num">
								{(s.rate * 100).toFixed(0)}%
							</td>
							<td className="num">{b ? fmt(b.tax) : "—"}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
		</div>
	);
}
