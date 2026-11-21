# Sample outputs

One scenario, a chemical-plant line with no redundancy, run through OT Cybersecurity ROSI Calculator v1.1. It matches the worked example in the user guide.

| Input | Value |
|---|---|
| Industry | Chemical / Continuous Process ($87,000/hour, an illustrative estimate for the whole site) |
| Criticality answers | No redundancy · 40–75% of output · some downstream impact · no workaround → score 7 → **75% of site cost** |
| Disruption / recovery | 18 hours · 2× recovery cost |
| Likelihood | 35% a year; the investment cuts likelihood 45% and impact 35% |
| Investment | $350,000 a year |

| Result | Value |
|---|---|
| Cost of one incident (SLE) | $2,349,000 |
| Expected annual loss before / after | $822,150 / $293,919 |
| Annual loss avoided | $528,231 |
| ROSI | **+51%** |
| Payback | about 8 months |

Files:
- `Sample_Board_Summary.pdf`: the one-page Board Summary (Print / Save as PDF).
- `Sample_ROSI_Export.xlsx`: the Excel export. Change any input and every result recalculates.
- `Calculator_Screen.png`: the calculator with these inputs.

Version 1.0 reported +604% for the same inputs because it multiplied the whole site's downtime cost by 3.5 instead of taking 75% of it.
