// @TODO: YOUR CODE HERE!
var svgWidth = 500;
var svgHeight = 500;


var margin = { top:30, right: 30, bottom: 30, left: 30}

var chartWidth = svgWidth - margin.left - margin.right
var	chartHeight = svgHeight - margin.top - margin.bottom
	
var svg = d3.select("#scatter")
			.append("svg")
			.attr("width", svgWidth)
			.attr("height", 500)
				
var chartGroup = svg.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(data => {

	data.forEach(d => {
		d.poverty = +d.poverty
		d.healthcare = +d.healthcare
	})

	console.log(data)
	var xBandScale = d3.scaleBand()
					   .domain(data.map(d => d.healthcare))
					   .range([0, chartWidth])
					   .padding(0.1)

	var yLinearScale = d3.scaleLinear()
						 .domain([0,d3.max(data, d => d.poverty)])
						 .range([chartHeight, 0])

	var xAxis = d3.axisBottom(xBandScale); 
	var yAxis = d3.axisLeft(yLinearScale); 

	chartGroup.append("g")
			  .call(yAxis); 

	chartGroup.append("g")
			  .attr("transform", `translate(0, ${chartHeight})`)
    		  .call(xAxis);

    chartGroup.selectAll("#scatter")
    		  .data(data)
    		  .enter() 
    		  .append("circle")
    		  .attr("cx", d => xBandScale(d.poverty))
    		  .attr("cy", d => yLinearScale(d.healthcare))
    		  .attr("width", xBandScale.bandwidth())
    		  .attr("height", d => chartHeight - yLinearScale(d.poverty))
});




	
