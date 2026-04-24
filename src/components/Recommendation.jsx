import { fmt } from "../utils/formatters.js";

export default function Recommendation({ newBetter, savings }) {
	return (
		<div className="recommendation">
			<h2>{newBetter ? "Choose NEW Regime" : "Choose OLD Regime"}</h2>
			<div className="savings-highlight">Saves {fmt(savings)}/year</div>
			<p>That's ~{fmt(savings / 12)}/month vs the other regime</p>
		</div>
	);
}
