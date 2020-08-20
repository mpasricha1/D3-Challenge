// @TODO: YOUR CODE HERE!

var margin = { top:20, right: 20, bottom: 30, left: 40}, 
	width = 500 - margin.left - margin.right, 
	height = 500 - margin.top - margin.bottom
	
var svg = d3.select("#scatter")
			.append("svg")
				.attr("width", 500)
				.attr("height", 500)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/data.csv").then(data => {
	var stateInfo = { 
		abbr: data.map(record => record.abbr),
		hcare: data.map(record => record.healthcare),
		poverty: data.map(record => record.poverty)
	}

	var x = d3.scaleLinear()
			  .domain([6,25])
			  .range([0,width])
	svg.append("g")
	   .attr("transform", "translate(0, " + height + ")")
	   .call(d3.axisBottom(x))

	var y = d3.scaleLinear()
			  .domain([4,25])
			  .range([height,0]);
	svg.append("g")
	   .call(d3.axisLeft(y)); 

	svg.append('g')
	   .selectAll("dot")
	   .data(data)
	   .enter()
	   .append("circle")
	   		.attr("cx", d => x(d.poverty))
	   		.attr("cy", d => y(d.healthcare))
	   		.attr("r", 6)
	   		.style("fill", "#AED6F1")
});


	//Plotly version 
	// var data = [{
	// 	x: stateInfo.poverty,
	// 	y: stateInfo.hcare,
	// 	mode: "markers",
	// 	type: "scatter"
	// }];

	// var layout = { 
	// 	title: "Healthcare vs. Poverty", 
	// 	xaxis: {
	// 		title: { 
	// 			text: "In Poverty(%)"
	// 		}
	// 	}, 
	// 	yaxis: { 
	// 		title: { 
	// 			text: "Lacks Healthcare(%)"
	// 		}
	// 	}
	// }
	// Plotly.newPlot("scatter", data, layout) 

	
