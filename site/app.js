const salesData = [
  { month: "Dec", year: 2025, sales: 6800 },
  { month: "Jan", year: 2026, sales: 7400 },
  { month: "Feb", year: 2026, sales: 7900 },
  { month: "Mar", year: 2026, sales: 8600 },
  { month: "Apr", year: 2026, sales: 9200 },
  { month: "May", year: 2026, sales: 9800 },
  { month: "Jun", year: 2026, sales: 10600 },
  { month: "Jul", year: 2026, sales: 11300 },
  { month: "Aug", year: 2026, sales: 12100 },
  { month: "Sep", year: 2026, sales: 13600 },
  { month: "Oct", year: 2026, sales: 14600 },
  { month: "Nov", year: 2026, sales: 16130 },
];

const summary = { orders: 1284, customers: 846 };
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const number = new Intl.NumberFormat("en-US");

document.querySelector("#total-sales").textContent = currency.format(
  salesData.reduce((total, item) => total + item.sales, 0)
);
document.querySelector("#orders").textContent = number.format(summary.orders);
document.querySelector("#customers").textContent = number.format(summary.customers);

const chart = document.querySelector("#sales-chart");
const maxValue = 20000;
const highest = Math.max(...salesData.map((item) => item.sales));
const tickValues = [20000, 15000, 10000, 5000, 0];

const yAxis = document.createElement("div");
yAxis.className = "y-axis";
tickValues.forEach((value) => {
  const tick = document.createElement("span");
  tick.textContent = value === 0 ? "$0" : `$${value / 1000}k`;
  yAxis.append(tick);
});

const plot = document.createElement("div");
plot.className = "plot";
const gridLines = document.createElement("div");
gridLines.className = "grid-lines";
tickValues.forEach(() => gridLines.append(document.createElement("span")));
plot.append(gridLines);

const bars = document.createElement("div");
bars.className = "bars";
const xAxis = document.createElement("div");
xAxis.className = "x-axis";

salesData.forEach(({ month, year, sales }) => {
  const slot = document.createElement("div");
  slot.className = "bar-slot";

  const bar = document.createElement("div");
  bar.className = `bar${sales === highest ? " is-highest" : ""}`;
  bar.style.height = `${(sales / maxValue) * 100}%`;
  bar.tabIndex = 0;
  bar.setAttribute("role", "img");
  bar.setAttribute("aria-label", `${month} ${year}: ${currency.format(sales)} in sales`);

  const tooltip = document.createElement("span");
  tooltip.className = "tooltip";
  tooltip.setAttribute("aria-hidden", "true");
  tooltip.textContent = currency.format(sales);
  bar.append(tooltip);
  slot.append(bar);
  bars.append(slot);

  const monthLabel = document.createElement("span");
  monthLabel.textContent = month;
  xAxis.append(monthLabel);
});

plot.append(bars);
chart.append(yAxis, plot, xAxis);
chart.setAttribute(
  "aria-label",
  `Monthly sales in US dollars from December 2025 through November 2026. Values range from ${currency.format(salesData[0].sales)} to ${currency.format(highest)}.`
);
