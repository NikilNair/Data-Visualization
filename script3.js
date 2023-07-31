const dataSets = {
    "Sector A": [
        { label: 'January', value: 900000 },
        { label: 'February', value: 900000 },
        { label: 'March', value: 800000 },
        { label: 'April', value: 800000 },
        { label: 'May', value: 800000 },
        { label: 'June', value: 800000 },
        { label: 'July', value: 750000 },
        { label: 'August', value: 650000 },
        { label: 'September', value: 650000 },
        { label: 'October', value: 650000 },
        { label: 'November', value: 600000 },
        { label: 'December', value: 600000 },
    ],
    "Sector B": [
        { label: 'January', value: 700000 },
        { label: 'February', value: 750000 },
        { label: 'March', value: 810000 },
        { label: 'April', value: 870000 },
        { label: 'May', value: 930000 },
        { label: 'June', value: 980000 },
        { label: 'July', value: 1040000 },
        { label: 'August', value: 1100000 },
        { label: 'September', value: 1150000 },
        { label: 'October', value: 1190000 },
        { label: 'November', value: 1220000 },
        { label: 'December', value: 1250000 },
    ],
    "Sector C": [
        { label: 'January', value: 1500000 },
        { label: 'February', value: 1550000 },
        { label: 'March', value: 1570000 },
        { label: 'April', value: 1620000 },
        { label: 'May', value: 1650000 },
        { label: 'June', value: 1700000 },
        { label: 'July', value: 1730000 },
        { label: 'August', value: 1750000 },
        { label: 'September', value: 1800000 },
        { label: 'October', value: 1820000 },
        { label: 'November', value: 1850000 },
        { label: 'December', value: 1900000 },
    ],
    "Sector D": [
        { label: 'January', value: 820000 },
        { label: 'February', value: 825000 },
        { label: 'March', value: 830000 },
        { label: 'April', value: 835000 },
        { label: 'May', value: 840000 },
        { label: 'June', value: 850000 },
        { label: 'July', value: 860000 },
        { label: 'August', value: 870000 },
        { label: 'September', value: 880000 },
        { label: 'October', value: 890000 },
        { label: 'November', value: 900000 },
        { label: 'December', value: 910000 },
    ],
    "Sector E": [
        { label: 'January', value: 850000 },
        { label: 'February', value: 780000 },
        { label: 'March', value: 870000 },
        { label: 'April', value: 720000 },
        { label: 'May', value: 950000 },
        { label: 'June', value: 620000 },
        { label: 'July', value: 980000 },
        { label: 'August', value: 590000 },
        { label: 'September', value: 990000 },
        { label: 'October', value: 600000 },
        { label: 'November', value: 1000000 },
        { label: 'December', value: 610000 },
    ],
};

const svgWidth = 800;
const svgHeight = 400;
const margin = { top: 30, right: 20, bottom: 70, left: 80 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const svg = d3.select('#chartContainer')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const xScale = d3.scaleBand()
    .range([0, chartWidth])
    .padding(0.1)
    .domain(dataSets['Sector A'].map(d => d.label));

const yScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(dataSets['Sector A'], d => d.value)]);

const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

chart.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${chartHeight})`);

chart.append('g')
    .attr('class', 'y-axis');

function updateChart(selectedData) {
    const data = dataSets[selectedData];

    xScale.domain(data.map(d => d.label));
    yScale.domain([0, d3.max(data, d => d.value)]);

    const line = d3.line()
        .x(d => xScale(d.label) + xScale.bandwidth() / 2)
        .y(d => yScale(d.value));

    let linePath = chart.select('.line');
    if (linePath.empty()) {
        linePath = chart.append('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue');
    }

    linePath.datum(data)
        .transition()
        .duration(1000)
        .attr('d', line);

    const circles = chart.selectAll('.dot')
        .data(data);

    circles.exit().remove();

    circles.enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.label) + xScale.bandwidth() / 2)
        .attr('cy', d => yScale(d.value))
        .attr('r', 4)
        .merge(circles)
        .transition()
        .duration(1000)
        .attr('cx', d => xScale(d.label) + xScale.bandwidth() / 2)
        .attr('cy', d => yScale(d.value));

    const xAxis = d3.axisBottom(xScale);
    chart.select('.x-axis')
        .transition()
        .duration(1000)
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.format('$,.0f'));
    chart.select('.y-axis')
        .transition()
        .duration(1000)
        .call(yAxis);
}

updateChart('Sector A');

d3.select('#dataSelector').on('change', function () {
    const selectedData = this.value;
    updateChart(selectedData);
});

chart.append('text')
    .attr('class', 'axis-title')
    .attr('x', chartWidth / 2)
    .attr('y', chartHeight + margin.top + 20)
    .attr('text-anchor', 'middle')
    .text('Months');


chart.append('text')
    .attr('class', 'axis-title')
    .attr('x', -chartHeight / 2)
    .attr('y', -margin.left + 10)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Average price of home sold');

const myButton = document.getElementById('myButtonBack');

function handleClick() {
    const newPageURL = 'index2.html';
    window.location.href = newPageURL;
}

myButton.addEventListener('click', handleClick);


const newButton = document.getElementById('myButtonHome');

function newClick() {
    const newPageURL = 'index.html';
    window.location.href = newPageURL;
}

newButton.addEventListener('click', newClick);