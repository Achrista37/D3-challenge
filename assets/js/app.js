
  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 80,
    bottom: 80,
    right: 80,
    left: 80
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
    


  //var axisText = d3.select("#scatter").append("text").attr("class","x-label").attr("text-anchor","end").attr("x",15).attr("y",0).text("------------------------------------------------")
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
  d3.csv("data.csv").then(function(hData) {

    // parse data
    hData.forEach(function(data) {
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
 
        .text(d => d.abbr)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .attr("x", (d) => xLinearScale(d.poverty))
        .attr("y", (d) => yLinearScale(d.healthcare))

      })
     
      ;

      console.log(hData);
      
  


  }).catch(function(error) {
    console.log(error);
  });