const data = [
    { label: 'Sector A', value: 33 },
    { label: 'Sector B', value: 38 },
    { label: 'Sector C', value: 57 },
    { label: 'Sector D', value: 32 },
    { label: 'Sector E', value: 45 },
];

const svgWidth = 800;
const svgHeight = 400;
const margin = { top: 100, right: 70, bottom: 70, left: 50 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const svg = d3.select('#chartContainer').append('svg').attr('width', svgWidth).attr('height', svgHeight);

const xScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .padding(0.1)
    .domain(data.map((d) => d.label));

const yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, d3.max(data, (d) => d.value)]);

const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

chart
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(d.label))
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => chartHeight - yScale(d.value))
    .on('mouseover', function (event, d) {
        tooltip.style('opacity', 1);
        tooltip
            .html('Number of Homes Sold: ' + formatValue(d.value) + '<br>' + 'Sector: ' + d.label)
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY - 30}px`);
    })
    .on('mouseout', function () {
        tooltip.style('opacity', 0);
    });

const annotations = [
    {
        note: {
            title: 'Sector C',
            label: 'This sector is located within a very popular area of downtown Hillsboro',
            wrap: 150,
        },
        x: xScale('Sector C') + xScale.bandwidth() / 2,
        y: yScale(57),
        dy: -20,
        dx: 5,
    },
    {
        note: {
            label: 'This sector is located within a very crime-heavy area of downtown Hillsboro',
            wrap: 150,
        },
        x: xScale('Sector E') + xScale.bandwidth() / 2,
        y: yScale(45),
        dy: -20,
        dx: 5,
    },
];

const makeAnnotations = d3.annotation().annotations(annotations);

chart.append('g').call(makeAnnotations);

const formatValue = d3.format(',.0f');

const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


const xAxis = d3.axisBottom(xScale);
chart.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(xAxis);

const yAxis = d3.axisLeft(yScale);
chart.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);


chart.append('text')
    .attr('class', 'axis-title')
    .attr('x', chartWidth / 2)
    .attr('y', chartHeight + margin.top + -50)
    .attr('text-anchor', 'middle')
    .text('Neighborhood Sectors within Hillsboro');


chart.append('text')
    .attr('class', 'axis-title')
    .attr('x', -chartHeight / 2)
    .attr('y', -margin.left + 10)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Number of Homes Sold');


const myButton = document.getElementById('myButtonBack');


function handleClick() {
    const newPageURL = 'index.html';
    window.location.href = newPageURL;
}

myButton.addEventListener('click', handleClick);


const newButton = document.getElementById('myButtonNext');

function newClick() {
    const newPageURL = 'index3.html';
    window.location.href = newPageURL;
}

newButton.addEventListener('click', newClick);