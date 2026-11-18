let charts = [];

export function clearCharts() {
  charts.forEach(chart => chart.destroy());
  charts = [];
}

const palette = {
  violet: "#8068c8",
  lavender: "#c5b7ed",
  coral: "#e98770",
  sage: "#91aa8d",
  gold: "#d8aa61",
  grid: "rgba(74, 65, 57, .08)",
  muted: "#96919a"
};

function commonOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#25232c", titleFont: { family: "DM Sans", size: 11 }, bodyFont: { family: "DM Sans", size: 10 }, padding: 11, cornerRadius: 9, displayColors: true, boxPadding: 4 }
    },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: palette.muted, font: { family: "DM Sans", size: 10 }, padding: 9 } },
      y: { border: { display: false }, grid: { color: palette.grid, drawTicks: false }, ticks: { color: palette.muted, font: { family: "DM Sans", size: 9 }, padding: 9, maxTicksLimit: 5 } }
    }
  };
}

export function mountDashboardCharts() {
  if (typeof Chart === "undefined") return;
  clearCharts();
  const revenue = document.getElementById("revenue-chart");
  if (revenue) {
    const ctx = revenue.getContext("2d");
    const fill = ctx.createLinearGradient(0, 0, 0, 270);
    fill.addColorStop(0, "rgba(128,104,200,.22)");
    fill.addColorStop(1, "rgba(128,104,200,0)");
    charts.push(new Chart(revenue, {
      type: "line",
      data: { labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"], datasets: [
        { label: "Tuition", data: [24, 31, 29, 42, 48, 57], borderColor: palette.violet, backgroundColor: fill, fill: true, tension: .42, borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: "#fffdfa", pointBorderWidth: 2, pointHoverRadius: 5 },
        { label: "Workshops", data: [11, 14, 17, 15, 23, 28], borderColor: palette.coral, backgroundColor: "transparent", tension: .4, borderWidth: 2, pointRadius: 2, pointHoverRadius: 4 }
      ] },
      options: { ...commonOptions(), scales: { ...commonOptions().scales, y: { ...commonOptions().scales.y, beginAtZero: true, ticks: { ...commonOptions().scales.y.ticks, callback: value => `$${value}k` } } } }
    }));
  }
  const funnel = document.getElementById("funnel-chart");
  if (funnel) charts.push(new Chart(funnel, {
    type: "doughnut",
    data: { labels: ["New", "Contacted", "Qualified", "Enrolled"], datasets: [{ data: [32, 25, 19, 14], backgroundColor: [palette.lavender, palette.violet, palette.coral, palette.sage], borderWidth: 0, borderRadius: 5, spacing: 4, hoverOffset: 5 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: "76%", plugins: { legend: { display: false }, tooltip: commonOptions().plugins.tooltip } }
  }));
  const enrollment = document.getElementById("enrollment-chart");
  if (enrollment) charts.push(new Chart(enrollment, {
    type: "bar",
    data: { labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"], datasets: [{ label: "New learners", data: [28, 35, 31, 44, 49, 61], backgroundColor: [palette.lavender, palette.lavender, palette.lavender, palette.lavender, palette.violet, palette.coral], borderRadius: 7, borderSkipped: false, barPercentage: .55 }] },
    options: { ...commonOptions(), scales: { ...commonOptions().scales, y: { ...commonOptions().scales.y, beginAtZero: true, ticks: { ...commonOptions().scales.y.ticks, stepSize: 20 } } } }
  }));
}

export function mountReportCharts(type = "revenue") {
  if (typeof Chart === "undefined") return;
  clearCharts();
  const canvas = document.getElementById("report-chart");
  if (!canvas) return;
  const labels = type === "enrollment" ? ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"] : ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const data = type === "enrollment" ? [28, 35, 31, 44, 49, 61] : type === "courses" ? [12, 16, 20, 25, 28, 36] : [35, 45, 46, 57, 71, 85];
  charts.push(new Chart(canvas, {
    type: "bar",
    data: { labels, datasets: [{ label: "Performance", data, backgroundColor: [palette.lavender, palette.lavender, palette.lavender, palette.violet, palette.violet, palette.coral], borderRadius: 8, borderSkipped: false, barPercentage: .48 }] },
    options: { ...commonOptions(), scales: { ...commonOptions().scales, y: { ...commonOptions().scales.y, beginAtZero: true } } }
  }));
}
