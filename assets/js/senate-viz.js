var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = chwidth - margin.left - margin.right,
    height = vizHeight - margin.top - margin.bottom;

var tip = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0); 


var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.amount; });

var div = d3.select(".senate-viz").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

d3.json("flare.json", function(error, root) {
  if (error) throw error;

  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .on("mouseover", function(d) {     
             tip.transition()    
                .duration(200)    
                .style("opacity", .9);    
             tip.html(d.recipient_name) 
                .style("left", (d3.event.pageX - 150) + "px")   
                .style("top", (d3.event.pageY - 8) + "px");  
            })
            .on("mouseout", function(d) {   
            tip.transition()    
                .duration(300)    
                .style("opacity", 0); 
        })
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; })
      .style("background", function(d) {
            if (d.recipient_party === "R") {return "#c81b30"}
            else  { return "#2f4879" }
        ;})
      .text(function(d) { return d3.round(d.amount); }); //rounded result 
      });
