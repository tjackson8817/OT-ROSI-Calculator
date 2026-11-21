# OT Cybersecurity ROSI Calculator

**[Open the live calculator →](https://tjackson8817.github.io/OT-ROSI-Calculator/)** · Version 1.1 (November 2026)

A free, browser-based tool that turns an OT security investment into a number a CFO can evaluate: the cost of one incident, expected annual loss before and after the investment, Return on Security Investment (ROSI), and payback period. Part of the Sale Fish OT tools.

**No installation needed.** Open `index.html` in any modern browser, or use the live link. All calculation happens locally; nothing you enter is sent anywhere. The Excel export loads the SheetJS library from `cdnjs.cloudflare.com`; if it can't load, the calculator and the Board Summary still work and the export button says why.

## What it does

1. **Asset Criticality Assessment.** Four questions (redundancy, share of plant output, knock-on effects, workaround) give a score of 0–9, which sets the **Site Impact Factor**: the share of the site's hourly downtime cost that an incident on this asset causes (10%, 25%, 50%, 75% or 100%).
2. **Loss Exposure Inputs.** Pick an industry to pre-fill a whole-site downtime cost per hour, with its source shown. Then set disruption duration and a recovery cost multiplier. If you enter a cost for this asset alone, set "The downtime cost below is for…" to "This asset or line only" so it isn't scaled twice.
3. **Probability & Mitigation Assumptions.** Annual Rate of Occurrence and how much the investment reduces likelihood and impact. These have no public benchmark and are labeled as yours to estimate.
4. **Live results.** SLE, baseline ALE, residual ALE, annual loss reduction, ROSI and payback, with a plain-English reading of the result.
5. **Export to Excel (.xlsx).** A formula-driven workbook: change an assumption in Excel and everything recalculates.
6. **Board Summary (Print / Save as PDF).** A one-page summary for a capital request or board packet.

## The math

```
SLE = Downtime Cost/Hour × Disruption Duration × Recovery Multiplier × Site Impact Factor
Baseline ALE = SLE × Annual Rate of Occurrence
Residual ALE = SLE × ARO × (1 − Probability Reduction) × (1 − Impact Reduction)
Annual Loss Reduction = Baseline ALE − Residual ALE
ROSI = (Annual Loss Reduction − Investment Cost) / Investment Cost
Payback (years) = Investment Cost / Annual Loss Reduction
```

## Downtime-cost defaults (whole site, per hour)

| Industry | $/hour | Source |
|---|---|---|
| General / Mixed Manufacturing (default) | 125,000 | ABB *Value of Reliability* 2023, global average ($103,000 US) |
| Automotive / Discrete (large plant) | 2,300,000 | Siemens *True Cost of Downtime* 2024 |
| Food & Beverage / Consumer Goods | 36,000 | Siemens *True Cost of Downtime* 2024 (FMCG) |
| Oil & Gas | 500,000 | Siemens *True Cost of Downtime* 2022 |
| Chemical, Semiconductor, Electric Utility, Pharmaceutical | 87,000 / 1,800,000 / 300,000 / 375,000 | Illustrative estimates — no published per-hour figure |
| Water & Wastewater | 0 | No production-loss figure; enter your own |

Checked against the published reports in November 2026.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The calculator |
| `samples/` | Sample board summary (PDF), Excel export and screenshot — see `samples/README.md` |
| `tests/rosi_math.test.js` | Checks the math against the worked example: `node tests/rosi_math.test.js` |

## Hosting on GitHub Pages

Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. The calculator is then live at `https://tjackson8817.github.io/OT-ROSI-Calculator/`.

## What's new in v1.1 (November 2026)

- **Criticality no longer double-counts.** v1.0 multiplied a whole-site downtime figure by 1.0×–5.0×, counting the same loss up to five times; the sample scenario showed +604% ROSI and a 7-week payback. The four questions now set the share of the site affected (10–100%); the same scenario is +51% with an 8-month payback.
- **"Downtime cost is for" setting** so a cost you enter for one asset isn't scaled down.
- **Sources corrected.** Food & Beverage was credited to ABB at $85,000/hour, a figure the ABB survey doesn't contain; it now uses Siemens' FMCG figure ($36,000). Figures with no published source are labeled as illustrative estimates.
- **Board Summary (Print / Save as PDF)** added; the old README listed it but it wasn't in the page.
- The README and web copy no longer claim a Risk Analyzer / Asset Inventory JSON import, which was never built.
- Excel export: cached values (previews show numbers), scenario name, source note, and a clear message if the spreadsheet library can't load.
- Inputs are kept in range (no negative costs or 150% likelihood); warning when the downtime cost is $0; plain-English result line; Reset to defaults; phone layout.

## Important limitations

- Only four downtime-cost defaults come from a published survey; the rest are illustrative. All describe a whole site; your own figure is always better.
- Annual Rate of Occurrence and mitigation effectiveness have no reliable industry benchmark.
- The Criticality Assessment is a structured judgment, not a measurement of your plant's topology.
- This is a defensible starting estimate for a conversation, not a certified financial determination.
