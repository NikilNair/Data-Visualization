const data = [
    { label: 'Sector A', value: 811420 },
    { label: 'Sector B', value: 922000 },
    { label: 'Sector C', value: 1543000 },
    { label: 'Sector D', value: 843000 },
    { label: 'Sector E', value: 920000 },

];

const svgWidth = 800;
const svgHeight = 400;
const margin = { top: 30, right: 20, bottom: 50, left: 90 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const svg = d3.select('#chartContainer')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);


const xScale = d3.scaleBand()
    .range([0, chartWidth])
    .padding(0.1)
    .domain(data.map(d => d.label));

const yScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(data, d => d.value)]);

const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

chart.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.label))
    .attr('y', d => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d.value))
    .on('mouseover', function (event, d) {
        tooltip.style('opacity', 3);
        tooltip.html("Average House Price: $" + formatValue(d.value) + "<br>" + "Sector: " + d.label)
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY - 30}px`);
    })
    .on('mouseout', function () {
        tooltip.style('opacity', 0);
    });

const formatValue = d3.format(',.0f');

const annotations = [
    {
        note: {
            label: 'This sector is brand new compared to the others',
            wrap: 150,
        },
        x: xScale('Sector A') + xScale.bandwidth() / 2,
        y: yScale(800000),
        dy: -20,
        dx: 12,
    },
    {
        note: {
            label: 'This sector was recently renovated',
            wrap: 150,
        },
        x: xScale('Sector D') + xScale.bandwidth() / 2,
        y: yScale(835000),
        dy: -20,
        dx: 12,
    },

];


const fontSize = 12;

const makeAnnotations = d3.annotation().annotations(annotations).type(d3.annotationLabel).accessors({
    x: (d) => xScale(d.label) + xScale.bandwidth() / 2,
    y: (d) => yScale(d.value),
});


function customizeAnnotations(sel) {
    sel.selectAll('.annotation-note-title').style('font-size', fontSize + 'px');
    sel.selectAll('.annotation-note-label').style('font-size', fontSize + 'px');
}

chart.append('g').call(makeAnnotations, customizeAnnotations);

const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


const xAxis = d3.axisBottom(xScale);
chart.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(xAxis);


const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format('$,.0f'));
chart.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);


chart.append('text')
    .attr('class', 'axis-title')
    .attr('x', chartWidth / 2)
    .attr('y', chartHeight + margin.top + 20)
    .attr('text-anchor', 'middle')
    .text('Neighborhood Sectors within Hillsboro');


chart.append('text')
    .attr('class', 'axis-title')
    .attr('x', -chartHeight / 2)
    .attr('y', -margin.left + 10)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Average House Price');


const myButton = document.getElementById('myButton');

function handleClick() {
    const newPageURL = 'index2.html';
    window.location.href = newPageURL;
}


myButton.addEventListener('click', handleClick);


