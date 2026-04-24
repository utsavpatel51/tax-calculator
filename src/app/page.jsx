import TaxCalculator from "../components/TaxCalculator";

const structuredData = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "India Salary & Tax Calculator FY 2025-26",
	description:
		"Compare Old vs New income tax regime, calculate HRA exemption, in-hand salary, 80C/80D deductions, and marginal relief u/s 87A for FY 2025-26.",
	applicationCategory: "FinanceApplication",
	operatingSystem: "Web",
	inLanguage: "en-IN",
	isAccessibleForFree: true,
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "INR",
	},
	featureList: [
		"Old vs New regime tax comparison",
		"HRA exemption calculator with 3-rule breakdown",
		"Monthly in-hand salary breakdown",
		"Marginal relief u/s 87A",
		"80C, 80D, 80CCD(1B), 80CCD(2), 24(b), 80E deductions",
		"FY 2025-26 tax slabs",
	],
};

export default function Page() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<TaxCalculator />
		</>
	);
}
