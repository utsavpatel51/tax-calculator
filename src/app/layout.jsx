import "./globals.css";

export const viewport = {
	width: "device-width",
	initialScale: 1,
};

export const metadata = {
	metadataBase: new URL("https://indian-tax-tool.vercel.app"),
	title: "India Salary & Tax Calculator FY 2025-26",
	description:
		"Indian income tax calculator for FY 2025-26. Compare Old vs New regime, estimate in-hand salary, HRA exemption, 80C, 80D, marginal relief u/s 87A — all in one place.",
	keywords: [
		"india income tax calculator",
		"salary calculator india 2025-26",
		"old regime vs new regime",
		"HRA exemption calculator",
		"in-hand salary calculator",
		"FY 2025-26 tax slab",
		"80C deduction calculator",
		"marginal relief 87A",
		"new tax regime calculator",
	],
	authors: [{ name: "Utsav Patel" }],
	icons: { icon: "/favicon.svg" },
	robots: { index: true, follow: true },
	openGraph: {
		title: "India Salary & Tax Calculator FY 2025-26",
		description:
			"Compare Old vs New tax regime, estimate in-hand salary, HRA exemption, and all deductions for FY 2025-26.",
		type: "website",
		locale: "en_IN",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: "India Salary & Tax Calculator FY 2025-26",
		description:
			"Quickly find your in-hand salary and compare Old vs New tax regime for FY 2025-26.",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
