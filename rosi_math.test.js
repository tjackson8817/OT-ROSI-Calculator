// Run with: node tests/rosi_math.test.js  (no dependencies)
// Pulls the calculation functions out of index.html and checks the worked example.
const fs = require("fs"), path = require("path"), assert = require("assert");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const js = html.slice(html.lastIndexOf("<script>") + 8, html.lastIndexOf("</script>"));
const m = {}; new Function("module", js)({ set exports(v) { Object.assign(m, v); } });

const near = (a, b) => assert.ok(Math.abs(a - b) < 0.01, `${a} != ${b}`);
const c = m.computeCriticality({ redundancy: 2, outputDependence: 2, cascadingDependents: 1, workaround: 2 });
assert.strictEqual(c.total, 7); assert.strictEqual(c.factor, 0.75);
assert.strictEqual(m.computeCriticality({ redundancy: 0, outputDependence: 0, cascadingDependents: 0, workaround: 0 }).factor, 0.10);
assert.strictEqual(m.computeCriticality({ redundancy: 2, outputDependence: 3, cascadingDependents: 2, workaround: 2 }).factor, 1.00);

const r = m.calculateROSI({ downtimeCostPerHour: 87000, durationHours: 18, recoveryMultiplier: 2, impactFactor: 0.75,
  aro: 0.35, probabilityReduction: 0.45, impactReduction: 0.35, investmentCost: 350000 });
near(r.sle, 2349000); near(r.baselineALE, 822150); near(r.residualALE, 293918.625);
near(r.annualLossReduction, 528231.375); near(r.rosi, 0.5092325); near(r.paybackYears, 0.66259);
assert.strictEqual(m.fmtROSI(r.rosi), "+51%"); assert.strictEqual(m.fmtYears(r.paybackYears), "8 months");

const z = m.calculateROSI({ downtimeCostPerHour: 1000, durationHours: 1, recoveryMultiplier: 1, impactFactor: 1,
  aro: 0.5, probabilityReduction: 0, impactReduction: 0, investmentCost: 0 });
assert.strictEqual(z.rosi, null); assert.strictEqual(z.paybackYears, null);
console.log("All ROSI calculator tests passed.");
