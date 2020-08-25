// @TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 500;

var chosenXAxis = 'poverty'
var chosenYAxis = 'healthcare'


var margin = { top:30, right: 30, bottom: 100, left: 95}

var chartWidth = svgWidth - margin.left - margin.right
var	chartHeight = svgHeight - margin.top - margin.bottom
	
var svg = d3.select("#scatter")
			.append("svg")
			.attr("width", svgWidth)
			.attr("height", svgHeight)
				
var chartGroup = svg.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`);

function xScale(data, chosenXAxis){
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d=> d[chosenXAxis]),d3.max(data, d => d[chosenXAxis])])
    .range([0, chartWidth]);
  
  return xLinearScale;

};

function renderXAxis(newXScale, xAxis){ 
  var bottomAxis = d3.axisBottom(newXScale).ticks(10);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
};

function yScale(data, chosenYAxis){
  var yLinearScale = d3.scaleLinear()
    .domain([3,d3.max(data, d => d[chosenYAxis])])
    .range([chartHeight, 0]);
  
  return yLinearScale;

}

function renderYAxis(newYScale, yAxis){
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis); 

  return yAxis;
};

function renderCircles(circleGroup, newXScale,newYScale,chosenXAxis,chosenYAxis){

  circleGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circleGroup;
};

d3.csv("assets/data/data.csv").then(data => {

	data.forEach(d => {
		d.poverty = +d.poverty
		d.healthcare = +d.healthcare
    d.obesity = +d.obesity
    d.age = +d.age
    d.smokes = +d.smokes
    d.income = +d.income

	})

  var xLinearScale = xScale(data,chosenXAxis);
  var yLinearScale = yScale(data, chosenYAxis);

  var xAxis = d3.axisBottom(xLinearScale); 
  var yAxis = d3.axisLeft(yLinearScale); 

	chartGroup.append("g")
		.call(yAxis); 

	chartGroup.append("g")
		.attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  var circleGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter() 
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "10")
    .attr("fill", "lightblue")
    .attr("opacity", 0.5)
    .attr("height", d => chartHeight - yScale(d) - 10);

  chartGroup.select("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .style("font-weight", "bold")
    .attr("fill", "black");



  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([90,-60])
    .html(function(d){ 
        return(`<strong>${d.state}, ${d.abbr}</strong><br>
          <strong>Healthcare: ${d.healthcare}<br></strong>
            <strong>Poverty ${d.poverty}</strong>`);
  });

  var labelGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight + 20})`); 

  var povertyLabel = labelGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty")
    .classed("active", true)
    .text("In Poverty(%)")

  var ageLabel = labelGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age")
    .classed("active", true)
    .text("Age(Median)")

  var incomeLabel = labelGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income")
    .classed("active", true)
    .text("Household Income(Median)")

  var healthcareLabel = labelGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", (margin.left) * 2.5)
    .attr("y", 0 - (chartHeight - 95))
    .attr("value", "healthcare")
    .classed("active", true)
    .text("Lacks Healthcare(%)");

  var smokesLabel = labelGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", (margin.left) * 2.5)
    .attr("y", 0 - (chartHeight - 75))
    .attr("value", "smokes")
    .classed("active", true)
    .text("Smokes(%)");

  var obeseLabel = labelGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", (margin.left) * 2.5)
    .attr("y", 0 - (chartHeight - 55))
    .attr("value", "obese")
    .classed("active", true)
    .text("Obese(%)");

  labelGroup.selectAll("text")
    .on("click", function(){
      var value = d3.select(this).attr("value"); 
      
      if (value === "poverty" || value === "age" || value === "income"){ 
        chosenXAxis = value; 
        console.log(`X Axes: ${chosenXAxis}`)

        xLinearScale = xScale(data, chosenXAxis)
        xAxis = renderXAxis(xLinearScale, xAxis)

        if (chosenXAxis === 'poverty'){
          povertyLabel
            .classed("active", true)
            .classed("inactive", false)

          ageLabel
            .classed("active", false)
            .classed("inactive", true)

          incomeLabel
            .classed("active", false)
            .classed("inactive", true)
        } else if (chosenXAxis == "age") {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true)

          ageLabel
            .classed("active", true)
            .classed("inactive", false)

          incomeLabel
            .classed("active", false)
            .classed("inactive", true)
        }else{
          povertyLabel
            .classed("active", false)
            .classed("inactive", true)

          ageLabel
            .classed("active", false)
            .classed("inactive", true)

          incomeLabel
            .classed("active", true)
            .classed("inactive", false)
        }
      }else { 
        chosenYAxis = value; 
        console.log(`Y Axis: ${chosenYAxis}`)
        yLinearScale = xScale(data, chosenYAxis)

        yAxis = renderYAxis(yLinearScale, yAxis)

        if (chosenYAxis === 'healthcare'){
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false)

          smokeLabel
            .classed("active", false)
            .classed("inactive", true)

          obeseLabel
            .classed("active", false)
            .classed("inactive", true)
        } else if (chosenYAxis === "smokes"){
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true)

          smokesLabel
            .classed("active", true)
            .classed("inactive", false)

          obeseLabel
            .classed("active", false)
            .classed("inactive", true)
        }else{
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true)

          smokesLabel
            .classed("active", false)
            .classed("inactive", true)

          obeseLabel
            .classed("active", true)
            .classed("inactive", false)
        }

      }
    });

  circleGroup = renderCircles(circleGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis)
  chartGroup.call(toolTip)

  circleGroup.on("mouseover", d => {
      toolTip.show(d,this)
  })

  .on("mouseout", (d,i) =>{
      toolTip.hide(d)
  });
});




	
