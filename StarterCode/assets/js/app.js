// @TODO: YOUR CODE HERE!
var svgWidth = 900;
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
	var xScale = d3.scaleLinear()
					   .domain([8,d3.max(data, d => d.poverty)])
					   .range([0, chartWidth]);

	var yScale = d3.scaleLinear()
						 .domain([3,d3.max(data, d => d.healthcare)])
						 .range([chartHeight, 0]);

	var yAxis = d3.axisLeft(yScale);
	var xAxis = d3.axisBottom(xScale).ticks(10); 
	 
	chartGroup.append("g")
			  .call(yAxis); 

	chartGroup.append("g")
			  .attr("transform", `translate(0, ${chartHeight})`)
    		  .call(xAxis);

    chartGroup.selectAll("circle")
    		  .data(data)
    		  .enter() 
    		  .append("circle")
    		  .attr("cx", d => xScale(d.poverty))
    		  .attr("cy", d => yScale(d.healthcare))
    		  .attr("r", "10")
    		  .attr("fill", "lightblue")
    		  .attr("opacity", 0.75)
    		  .attr("height", d => chartHeight - yScale(d));

    chartGroup.select("g")
    	.selectAll("cirle")
    	.data(data)
    	.enter()
    	.append("text")
    	.text(d => d.abbr)
    	.attr("x", d => xScale(d.poverty))
    	.attr("y", d => yScale(d.healthcare))
    	.attr("text-anchor", "middle")
    	.attr("font-size", "10px")
    	.style("font-weight", "bold")
    	.attr("fill", "black");

    chartGroup.append("text")
    	.attr("transform", "rotate(-90)")
    	.attr("x", 0 - (chartHeight/2))
    	.attr("y", 0 - margin.left)
    	.style("text-anchor", "middle")
    	.text("Lacks Heathcare(%)")

   	chartGroup.append("text")             
      .attr("transform",
            "translate(" + (chartWidth/2) + " ," + 
                           (chartHeight + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("In Poverty(%)");
});




	
