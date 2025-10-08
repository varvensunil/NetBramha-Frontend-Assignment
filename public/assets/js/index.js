// Dashboard Data 
var ChartsData = {
    "creditRange": {
        "from": 300,
        "to": 900
    },
    "accounts": {
        "all": {
            "labels": ["Closed Credit Cards", "Closed Loan", "Open Credit Cards", "Open Loan"],
            "data": [4, 1, 6, 2],
            "colors": ["#7E79DD", "#FDE866", "#99DBEA", "#67D995"]
        },
        "open": {
            "labels": ["Open Credit Cards", "Open Loan"],
            "data": [6, 2],
            "colors": ["#99DBEA", "#67D995"]
        },
        "close": {
            "labels": ["Closed Credit Cards", "Closed Loan"],
            "data": [4, 1],
            "colors": ["#7E79DD", "#FDE866"]
        }
    },
    "history": {
        "Jan": { "label": "JAN", "data": 0 },
        "Feb": { "label": "FEB", "data": 0 },
        "Mar": { "label": "MAR", "data": 0 },
        "Apr": { "label": "APR", "data": 520 },
        "May": { "label": "MAY", "data": 580 },
        "Jun": { "label": "JUN", "data": 493 },
        "Jul": { "label": "JUL", "data": 0 },
        "Aug": { "label": "AUG", "data": 510 },
        "Sep": { "label": "SEP", "data": 0 },
        "Oct": { "label": "OCT", "data": 0 },
        "Nov": { "label": "NOV", "data": 0 },
        "Dec": { "label": "DEC", "data": 0 }
    },
    "scoreRange": [
        { "color": "#E15825", "percentage": 15, "range": { "from": 300, "to": 722 } },
        { "color": "#F18200", "percentage": 22, "range": { "from": 723, "to": 747 } },
        { "color": "#FCD800", "percentage": 26, "range": { "from": 748, "to": 764 } },
        { "color": "#A9D161", "percentage": 18, "range": { "from": 765, "to": 777 } },
        { "color": "#009900", "percentage": 20, "range": { "from": 778, "to": 900 } }
    ],
    "nbScore": 767
}

var currentTab = 'all';


// guage chart
const ctx = document.getElementById("gauge-nb-score").getContext('2d');

const percent = (ChartsData.nbScore - ChartsData.creditRange.from) / (ChartsData.creditRange.to - ChartsData.creditRange.from);
const angle = Math.PI * percent;

document.querySelector(".bnscoreGuage").innerHTML = ChartsData.nbScore;

const gaugeChart = new Chart(ctx, {
    type: "doughnut",
    data: {
        datasets: [{
            data: [60, 10, 10, 10, 10],
            backgroundColor: ["#E15825", "#F18200", "#FCD800", "#A9D161", "#009900"],
            borderWidth: 3,
            circumference: 180,
            rotation: 270,
            cutout: "85%"
        }]
    },
    options: {
        responsive: true,
        aspectRatio: 4,
        plugins: {
            tooltip: { enabled: false }
        }
    },
    plugins: [{
        id: 'needle',
        afterDraw(chart) {
            const { ctx, chartArea: { width, height, left, bottom } } = chart;
            ctx.save();

            const cx = left + width / 2;
            const cy = bottom;

            const needleAngle = Math.PI * (1 - percent);

            ctx.beginPath();
            ctx.arc(cx, cy, 25, 0, Math.PI * 2);
            ctx.fillStyle = "#d3d3d3";
            ctx.fill();

            ctx.save();
            ctx.translate(cx, cy - 10);
            ctx.rotate(needleAngle);
            ctx.beginPath();

            const topWidth = 3;
            const bottomWidth = 6;
            const needleLength = height / 2;
            const cornerRadius = 3;

            ctx.moveTo(-bottomWidth / 2, 0);

            ctx.lineTo(-topWidth / 2, -needleLength + cornerRadius);

            ctx.quadraticCurveTo(0, -needleLength, topWidth / 2, -needleLength + cornerRadius);

            ctx.lineTo(bottomWidth / 2, 0);

            ctx.quadraticCurveTo(0, cornerRadius, -bottomWidth / 2, 0);

            ctx.closePath();

            ctx.fillStyle = "black";
            ctx.fill();

            ctx.restore();


            ctx.font = "bold 16px Arial";
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.fillText(`${ChartsData.nbScore} / 900`, cx, cy + 40);
        }
    }]
});


// Donut Chart 
const ctx1 = document.getElementById('donutChart').getContext('2d');

const donutChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ChartsData.accounts[currentTab].labels,
        datasets: [{
            data: ChartsData.accounts[currentTab].data,
            backgroundColor: ChartsData.accounts[currentTab].colors,
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: '85%',
        plugins: { legend: { display: false } }
    },
    plugins: [{
        id: 'centerText',
        afterDraw(chart) {
            const { ctx, chartArea: { width, height } } = chart;
            const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            ctx.save();
            ctx.font = '400 16px Roboto';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Total Accounts ${total}`, width / 2, height / 2);
            ctx.restore();
        }
    }]
});

// Tabs Rendering
const legendSection = document.getElementById('legendSection');
function renderLegend(tab) {
    legendSection.innerHTML = '';
    const data = ChartsData.accounts[tab];
    data.labels.forEach((label, i) => {
        const div = document.createElement('div');
        div.classList.add('legend-item');
        div.innerHTML = `
          <div class="legend-color" style="background-color:${data.colors[i]}"></div>
          <div class="lists-donuts">
            <div>${label}</div>
            <div>${data.data[i]}</div>
          </div>`;
        legendSection.appendChild(div);
    });
}

// Tab Buttons
document.querySelectorAll('.tab-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-buttons button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.dataset.tab;

        // Update chart
        donutChart.data.labels = ChartsData.accounts[currentTab].labels;
        donutChart.data.datasets[0].data = ChartsData.accounts[currentTab].data;
        donutChart.data.datasets[0].backgroundColor = ChartsData.accounts[currentTab].colors;
        donutChart.update();

        // Update legend
        renderLegend(currentTab);
    });
});

renderLegend(currentTab);


// Line Chart
const ctx2 = document.getElementById('lineAccountCanvas').getContext('2d');
const labels = Object.values(ChartsData.history).map(item => item.label);
const dataValues = Object.values(ChartsData.history).map(item => item.data);
const filteredData = dataValues.map(val => (val === 0 ? null : val));

const lineChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'NB Score History',
            data: filteredData,
            borderColor: '#046899',
            borderWidth: 2,
            pointRadius: 4,
            pointBorderWidth: 3,
            pointBackgroundColor: '#FDDC02',
            pointBorderColor: '#046899',
            tension: 0.1,
            fill: false,
            spanGaps: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 300,
                max: 900,
                ticks: { stepSize: 100 }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#fff',
                backgroundColor: "#046899",
                borderRadius: 2,
                padding: { top: 5, bottom: 5, left: 10, right: 10 },
                font: {
                    weight: 'light',
                    size: 10
                },
                formatter: (value) => value
            }
        }
    },
    plugins: [ChartDataLabels]
});


(() => {
    const gaugeContainer = document.querySelector(".linear-gauge");
    const rangeContainer = document.querySelector(".score-range");

    rangeContainer.innerHTML = `<div>Score Range :</div>`;
    let totalWidthSoFar = 0;
    let arrowPositionPercent = 0;

    ChartsData.scoreRange.forEach((item) => {
        const { color, percentage, range } = item;
        const div = document.createElement("div");
        div.style.width = `${percentage}%`;
        div.style.height = "50px";
        div.style.padding = "15px 15px";
        div.style.textAlign = "center";
        div.style.color = "#fff";
        div.style.backgroundColor = color;
        div.innerHTML = `${percentage}%`;
        div.style.position = "relative";
        div.className = "bar-gauge";
        gaugeContainer.appendChild(div);

        rangeContainer.innerHTML += `
            <div class="range-items d-flex align-items-center gap-2 mt-1">
                <div class="bg-colors" style="width: 20px; height: 20px; background-color: ${color};"></div>
                <div class="fw-bold">${range.from}-${range.to}</div>
            </div>`;

        if (ChartsData.nbScore >= range.from && ChartsData.nbScore <= range.to) {
            const rangeSpan = range.to - range.from;
            const withinPercent = ((ChartsData.nbScore - range.from) / rangeSpan) * percentage;
            arrowPositionPercent = totalWidthSoFar + withinPercent;
        }


        totalWidthSoFar += percentage;
    });

    const arrow = document.createElement("div");
    arrow.classList.add("arrow-select-position");
    arrow.innerHTML = `<img src="./assets/icons/arrow-up-mark.png" alt="arrow position" />`;
    gaugeContainer.appendChild(arrow);

    arrow.style.left = `${arrowPositionPercent}%`;

    document.querySelector(".nbScore").innerText = ChartsData.nbScore;
})();
