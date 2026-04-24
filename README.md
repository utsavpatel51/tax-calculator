# India Salary & Tax Calculator — FY 2025-26

A simple, fast tool to estimate your in-hand salary and compare Old vs New income tax regime.

## Features

- **Regime comparison** — side-by-side Old vs New regime tax breakdown with slab-wise detail
- **In-hand breakdown** — monthly Base Pay, Employee PF, Tax, and In-Hand per regime
- **HRA exemption** — calculates min of 3 rules (actual HRA / city cap / rent − 10% basic) with formula shown
- **All key deductions** — 80C, 80CCD(1B), 80CCD(2) Corp NPS, 80D, 24(b), 80E with caps enforced
- **Marginal relief u/s 87A** — correctly handles the ₹12L (new) / ₹5L (old) rebate cliff
- **87A rebate** — full rebate applied when taxable income is within limits
- **FY 2025-26 rules popover** — hover over the header to see all slabs, deductions, and rebate limits used

## Getting Started

```bash
npm install
npm run dev      # development server
npm run build    # static export → /out
npm run start    # preview production build
```

## Disclaimer

This tool is for **educational purposes only**. Figures shown are indicative and may not reflect your actual tax liability. Surcharge, marginal relief edge cases, state-specific rules, and latest CBDT amendments are not fully modelled. Do not use for filing or financial planning. Consult a qualified CA for your actual tax situation.
