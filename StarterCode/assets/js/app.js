// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 1000;

var margin = { top:30, right: 30, bottom: 30, left: 30}

var chartWidth = svgWidth - margin.left - margin.right
var	chartHeight = svgHeight = margin.top - margin.bottom
	
var svg = d3.select("#scatter")
			.append("svg")
			.attr("width", svgWidth)
			.attr("height", svgHeight)
				
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

	var bottomAxis = d3.axisBottom(xBandScale); 
	var leftAxis = d3.axisLeft(yLinearScale); 

	chartGroup.append("g")
			  .call(leftAxis); 

	chartGroup.append("g")
			  .attr("transform", `translate(0, ${chartHeight})`)
    		  .call(bottomAxis);

    chartGroup.selectAll("#scatter")
    		  .data(data)
    		  .enter() 
    		  .append("circle")
    		  .attr("cx", d => xBandScale(d.povery))
    		  .attr("cy", d => yLinearScale(d.healthcare))
    		  .attr("width", xBandScale.bandwidth())
    		  .attr("height", d => chartHeight - yLinearScale(d.povery))
});




	
