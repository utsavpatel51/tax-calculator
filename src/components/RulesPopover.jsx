"use client";

import { useEffect, useRef, useState } from "react";
import {
	NEW_REGIME_SLABS,
	OLD_REGIME_SLABS,
	STANDARD_DED_NEW,
	STANDARD_DED_OLD,
	CESS_RATE,
	REBATE_LIMIT_NEW,
	REBATE_LIMIT_OLD,
} from "../constants/taxConstants.js";
import { fmt } from "../utils/formatters.js";

function SlabList({ slabs }) {
	return (
		<ul className="popover-slab-list">
			{slabs.map((s, i) => {
				const label =
					s.to === Infinity
						? `Above ${fmt(s.from)}`
						: `${fmt(s.from)} – ${fmt(s.to)}`;
				return (
					<li key={i}>
						<span>{label}</span>
						<span>{(s.rate * 100).toFixed(0)}%</span>
					</li>
				);
			})}
		</ul>
	);
}

export default function RulesPopover({ children }) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		function handleOutsideClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [open]);

	return (
		<span
			ref={ref}
			className="rules-tooltip"
			onClick={() => setOpen((v) => !v)}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
		>
			{children}
			{open && (
				<div className="rules-popover" role="tooltip">
					<div className="popover-title">FY 2025-26 Constants Used</div>

					<div className="popover-section">
						<h4>New Regime Slabs</h4>
						<SlabList slabs={NEW_REGIME_SLABS} />
					</div>

					<div className="popover-section">
						<h4>Old Regime Slabs</h4>
						<SlabList slabs={OLD_REGIME_SLABS} />
					</div>

					<div className="popover-section">
						<h4>Other</h4>
						<ul className="popover-kv">
							<li>
								<span>Standard Deduction (New)</span>
								<span>{fmt(STANDARD_DED_NEW)}</span>
							</li>
							<li>
								<span>Standard Deduction (Old)</span>
								<span>{fmt(STANDARD_DED_OLD)}</span>
							</li>
							<li>
								<span>Health & Education Cess</span>
								<span>{(CESS_RATE * 100).toFixed(0)}%</span>
							</li>
							<li>
								<span>Rebate 87A limit (New)</span>
								<span>{fmt(REBATE_LIMIT_NEW)}</span>
							</li>
							<li>
								<span>Rebate 87A limit (Old)</span>
								<span>{fmt(REBATE_LIMIT_OLD)}</span>
							</li>
						</ul>
					</div>
				</div>
			)}
		</span>
	);
}
