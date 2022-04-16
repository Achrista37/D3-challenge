// The code for the chart is wrapped inside a function that
// automatically resizes the chart
/*function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
*/

  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
    
    

  // Append group element
  //var formatAxis = d3.format("  0");


  //var axisText = d3.select("#scatter").append("text").attr("class","x-label").attr("text-anchor","end").attr("x",15).attr("y",0).text("------------------------------------------------")
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
  d3.csv("data.csv").then(function(hData) {

    // create date parser
  //  var dateParser = d3.timeParse("%d-%b");

    // parse data
    hData.forEach(function(data) {
//      data.date = dateParser(data.date);
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.abbr = data.abbr;
    });

    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(hData, d => d.poverty))
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(hData, d => d.healthcare)])
      .range([height, 0]);

    // create axes
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale).ticks(20);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);


    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(hData)
      .enter()
      .append("g")
      .attr("id","circle-wrapper")
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "10")
      .attr("fill", "gold")
      .attr("stroke-width", "1")
      .attr("stroke", "black")
      .attr('opacity', 0.2)
     // .html(function (d) {return `${d.abbr}`})
      ;
      chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 - 250)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Access to Healthcare (%)");
  
    chartGroup
      .append("text")
      .attr("transform", `translate(${width / 5.5}, ${height + margin.top + 55})`)
      .classed("axis-text", true)
      .text("In Poverty (%)");


      chartGroup
      .selectAll("g#circle-wrapper")
      .data(hData, function (d) {
        console.log(d);
        d3.select(this).append("text")
       // .select("text")
        .text(d => d.abbr)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .attr("x", (d) => xLinearScale(d.poverty))
        .attr("y", (d) => yLinearScale(d.healthcare))
     //   .attr("dy", -395)
      })
     // .enter()
     /* .each(function (circle) {
        console.log(this);
        d3.select(this).append("text")
        .select("text")
        .text((d) => d.abbr)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        })
      */
    /*
      .attr("x", (d) => xLinearScale(d.poverty))
      .attr("y", (d) => yLinearScale(d.healthcare))
      .attr("dy", -395)
      */
      ;

      console.log(hData);
      
  
 
    // Step 1: Append tooltip div
   /*
    var toolTip = d3
    .tooltip()
    .attr("class", "tooltip")
    .offset([0, 0])
    .style("color", "black")
    .style("background", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .html(function (d) {
      return `${d.abbr}`;
    });
*/
    circlesGroup.call(toolTip);
/*
    svg.selectAll("text")
      .data(hData)
      .enter()
      .append("text")
      .attr('x', (item) => {return item[0]})
  
*/

  // Step 7: Create tooltip in the chart
  // ==============================
  //circlesGroup.call(toolTip);
  /*
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);

    // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.style("display", "block")
          .html(
            `<strong>${dateFormatter(d.poverty)}<strong><hr>${d.healthcare}
        medal(s) won`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
      // Step 3: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });
*/
  }).catch(function(error) {
    console.log(error);
  });


// When the browser loads, makeResponsive() is called.
//makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
